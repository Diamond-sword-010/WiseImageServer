
import { Recommend } from "../models/recommend.model";
import { RecommendDtoAll, RecommendDto } from "../Dto/recommendad.dto";
import recommendService from "../services/recommend.service";
import { RecommendationToMoveSolidersBetweenHtmrsDto } from '../../htmr/Dto/htmrDto';
import HtmrLogic from '../../htmr/logic/htmrLogic';
import GetEventsLogic from "../../event/logic/getEvents";
import { HotArea } from "../../event/Dto/hotAra.dto";
import { EventDto } from "../../event/Dto/event.dto";

/**
 * This class is responsible for the logic of the moudule.
 * For example - excute transformation, calcualtion and etc...
 */
class GetRecommendLogic {

    getAllRecommends = async (): Promise<RecommendDtoAll[]> => {
        const troopses: Recommend[] = await recommendService.getRecommends();
        const troopsesDto: RecommendDtoAll[] = troopses.map((recommends) =>
        Recommend.toDto(recommends));
        return troopsesDto;
    };

    getRecommendationsToMoveSolidersBetweenHtmrs = async(): 
    Promise<RecommendDto[]> => {
        const recommendations: RecommendationToMoveSolidersBetweenHtmrsDto[] = 
        await HtmrLogic.getRecommendationsToMoveSolidersBetweenHtmrs();
        
        return recommendations.map((recommend) => {
            return new RecommendDto('העברת כוחות בין חטמרים',
             `כדאי להעביר חיילים מ${recommend.needToSendHtmrName} ל${recommend.needToGetHtmrName}`
             , false, 'purple');
        });
    };
    getHotAreaReccomendations = async (): Promise<RecommendDto[]> => {
        const hotAreas: HotArea[] = await GetEventsLogic.getHotAreas();
        const recommends: RecommendDto[] = hotAreas.map(area => {
            return this._toHotAreaReccomendation(area)
        })

        return recommends;
    }

    _toHotAreaReccomendation = (hotArea: HotArea):RecommendDto => {
        const title = 'חיבור סנסור באיזור חם'
        const content = `קורדינאטות למצלמה: ${hotArea.sensorLatitude} , ${hotArea.sensorLongitde}
        מספר אירועים באזור: ${hotArea.eventAmount}`

        return new RecommendDto(title, content, false, 'brown');
    }
}

export default new GetRecommendLogic();
