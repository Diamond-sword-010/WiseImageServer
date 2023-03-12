import { Htmr } from "../models/htmrModel";
import { Double } from "typeorm";
import { locationDto } from "./locationsDto";

/**
 * This class represent a smaller part of the entity.
 * Its includes only the relavnt fields we want to display.
 */
export class HtmrDto {
    name: string;
    securityLevel: Double;
    htmrLocations: locationDto[];
  
    constructor(htmrEntity: Htmr , locations: locationDto[]) {
      this.name = htmrEntity.name;
      this.securityLevel = htmrEntity.securityLevel;
      this.htmrLocations = locations;

    }
  }

  export class HtmrsSecurityLevelAmountsDto {
    noRiskAmount: number;
    regularRiskAmount: number;
    highRiskAmount: number;

    constructor(noRiskAmount: number, regularRiskAmount: number, highRiskAmount: number) {
      this.noRiskAmount = noRiskAmount;
      this.regularRiskAmount = regularRiskAmount;
      this.highRiskAmount = highRiskAmount;
    }

  }

  export class EventsInHtmrDto {
    name: String;
    eventsAmount: number;

    constructor(name: String, eventAmount: number) {
      this.name = name;
      this.eventsAmount = eventAmount;
    }
  }

  export class HtmrWithSolidersAmountDto {
    name: String;
    securityLevel: Double;
    solidersAmount: number;

    constructor(name: String, securityLevel: Double, solidersAmount: number) {
      this.name = name;
      this.securityLevel = securityLevel;
      this.solidersAmount = solidersAmount;
    }
  }

  export class HtmrWithUrgencyLevelDto {
    name: String;
    urgencyLevel: number;

    constructor(name: String, urgencyLevel: number) {
      this.name = name;
      this.urgencyLevel = urgencyLevel;
    }
  }

  export class RecommendationToMoveSolidersBetweenHtmrsDto {
    needToGetHtmrName: String;
    needToSendHtmrName: String;

    constructor(needToGetHtmrName: String, needToSendHtmrName: String) {
      this.needToGetHtmrName = needToGetHtmrName;
      this.needToSendHtmrName = needToSendHtmrName;
    }
  }