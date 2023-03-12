import { HtmrDto, HtmrsSecurityLevelAmountsDto, EventsInHtmrDto,
  HtmrWithSolidersAmountDto, HtmrWithUrgencyLevelDto, RecommendationToMoveSolidersBetweenHtmrsDto } from "../Dto/htmrDto";
import { locationDto } from "../Dto/locationsDto";
import { Htmr } from "../models/htmrModel";
import { locationHtmr } from "../models/locationModel";
import htmrService from "../services/htmr.service";
import locationService from "../services/locationService";
import getEvents from '../../event/logic/getEvents';
import { EventDto } from '../../event/Dto/event.dto';
import {IsPointInPolygon, isPointInArea} from '../../../utils/utils';
import TroopsService from '../../troops/services/troops.service';
import { Troops } from '../../troops/models/troops.model';

/**
 * This class is responsible for the logic of the moudule.
 * For example - excute transformation, calcualtion and etc...
 */
class GetHtmrLogic {
  getAllHtmr = async (): Promise<HtmrDto[]> => {
    const htmrs: Htmr[] = await htmrService.getHtmrs();
    const locations: locationHtmr[] = await locationService.getlocations();
    const htmrsDto : HtmrDto[] = htmrs.map((htmr) => {
      const htmrLocationDto = locations
        .filter((location) => htmr.id === location.htmrId)
        .map((location) => location.toDto());
        const htmrDto = htmr.toDto(htmrLocationDto);
        return htmrDto;
    });

    return htmrsDto;
  };

  getHtmrSecurityLevelAmounts =
    async (): Promise<HtmrsSecurityLevelAmountsDto> => {
      const htmrs: Htmr[] = await htmrService.getHtmrs();
      const noRiskAmount = htmrs.filter(
        (htmr) => htmr.securityLevel > 0 && htmr.securityLevel <= 0.33
      ).length;
      const regularRiskAmount = htmrs.filter(
        (htmr) => htmr.securityLevel > 0.33 && htmr.securityLevel <= 0.66
      ).length;
      const highRiskAmount = htmrs.length - noRiskAmount - regularRiskAmount;
      const HtmrDto: HtmrsSecurityLevelAmountsDto =
        new HtmrsSecurityLevelAmountsDto(
          noRiskAmount,
          regularRiskAmount,
          highRiskAmount
        );
      return HtmrDto;
    };

    getEventsAmountInHtmrs = async(): Promise<EventsInHtmrDto[]> => {
      const htmrs: HtmrDto[] = await this.getAllHtmr();
      const events: EventDto[] = await getEvents.getAllEvents();
      return htmrs.map((htmr) => {
        let eventsAmount = 0;
        events.forEach((event) => {
          const eventPoint = [event.latitude, event.longitude];
          if(isPointInArea(eventPoint, htmr.htmrLocations)) {
            eventsAmount += 1;
          };
        });
        return new EventsInHtmrDto(htmr.name, eventsAmount);
      });
    };

    getHtmrsWithSolidersAmount = async(): Promise<HtmrWithSolidersAmountDto[]> => {
      const htmrs: HtmrDto[] = await this.getAllHtmr();
      const troops: Troops[] = await TroopsService.getTroops();

      return htmrs.map((htmr) => {
        let solidersAmount = 0;
        troops.forEach((troop) => {
          const troopPoint = [troop.latitude, troop.longitude];

          if(isPointInArea(troopPoint, htmr.htmrLocations)) {
            solidersAmount += troop.amount;
          };
        });
        return new HtmrWithSolidersAmountDto(htmr.name, htmr.securityLevel, solidersAmount);
      });
    };

    getAvgSolidersAmountInHtmrs = async () => {
      const htmrs: HtmrDto[] = await this.getAllHtmr();
      const troops: Troops[] = await TroopsService.getTroops();
      let troopsAmount = 0;

      troops.forEach((troop) => {
        troopsAmount += troop.amount;
      });

      return (troopsAmount / htmrs.length);
    };

    getAvgSecurityLevelOfHtmrs = async () => {
      const htmrs: HtmrDto[] = await this.getAllHtmr();
      let securityLevelAmount = 0;
      
      htmrs.forEach((htmr) => {
        securityLevelAmount += Number(htmr.securityLevel);
      });

      return (securityLevelAmount / htmrs.length);
    };

    getNeedToGetSolidersHtmrs = async () => {
      const htmrs: HtmrWithSolidersAmountDto[] = await this.getHtmrsWithSolidersAmount();
      const avgSolidersAmount = await this.getAvgSolidersAmountInHtmrs();
      const avgSecurityLevel = await this.getAvgSecurityLevelOfHtmrs();

      return htmrs.filter((htmr) => {
        if (htmr.securityLevel > avgSecurityLevel && htmr.solidersAmount < avgSolidersAmount) {
          return htmr;
        };
      });
    };

    getNeedToSendSolidersHtmrs = async () => {
      const htmrs: HtmrWithSolidersAmountDto[] = await this.getHtmrsWithSolidersAmount();
      const avgSolidersAmount = await this.getAvgSolidersAmountInHtmrs();
      const avgSecurityLevel = await this.getAvgSecurityLevelOfHtmrs();

      return htmrs.filter((htmr) => {
        if (htmr.securityLevel < avgSecurityLevel && htmr.solidersAmount > avgSolidersAmount) {
          return htmr;
        };
      });
    };

    getNeedToGetSolidersHtmrsWithUrgencyLevel = async () => {
      const needToGetSolidersHtmrs = await this.getNeedToGetSolidersHtmrs();

      return needToGetSolidersHtmrs.map((htmr) => {
      let urgencyLevel = (Number(htmr.securityLevel) / Number(htmr.solidersAmount));

      return new HtmrWithUrgencyLevelDto(htmr.name, urgencyLevel);
      }).sort(function(htmrA, htmrB){return htmrB.urgencyLevel - htmrA.urgencyLevel});
    };

    getNeedToSendSolidersHtmrsWithUrgencyLevel = async () => {
      const needToSendSolidersHtmrs = await this.getNeedToSendSolidersHtmrs();

      return needToSendSolidersHtmrs.map((htmr) => {
      let urgencyLevel = (Number(htmr.securityLevel) / Number(htmr.solidersAmount));

      return new HtmrWithUrgencyLevelDto(htmr.name, urgencyLevel);
      }).sort(function(htmrA, htmrB){return htmrA.urgencyLevel - htmrB.urgencyLevel});
    };

    getRecommendationsToMoveSolidersBetweenHtmrs = async () => {
      const needToGetHtmrs = await this.getNeedToGetSolidersHtmrsWithUrgencyLevel();
      const needToSendHtmrs = await this.getNeedToSendSolidersHtmrsWithUrgencyLevel();
      const recommendations = [];

      for (let index = 0; index < Math.min(needToGetHtmrs.length, needToSendHtmrs.length); index++) {
        recommendations.push(new RecommendationToMoveSolidersBetweenHtmrsDto
          (needToGetHtmrs[index].name, needToSendHtmrs[index].name))
      };

      return recommendations;
    };
}

export default new GetHtmrLogic();
