import { Event } from "../../event/models/event.model";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Recommend } from "../models/recommend.model";
import getTroopses from "../../troops/logic/getRootses";
import { TroopsDto } from "../../troops/Dto/troops.location.dto";
import { EmergencyHospitalDto } from "../../hospital/Dto/emergencyHospital.dto";

// get the Repoistory of the Entity
const recommendServiceRepository: Repository<Recommend> =
  AppDataSource.getRepository(Recommend);

/**
 * This class is responsible to access the DB.
 */
class RecommendService {
  /**
   * get all the examples from db
   * @returns - all the exmaples entities from the db
   */
  getRecommends = async (): Promise<Recommend[]> => {
    try {
      const data: Recommend[] = await recommendServiceRepository.find();
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  addTroopsRecommend = async (event: Event) => {
    try {
      let min = 1000;
      const troops: TroopsDto[] = await getTroopses.getAllTroopses();
      let closestTroop: TroopsDto = troops[0];
      troops.forEach((troop) => {
        const distance = Math.sqrt(
          Math.pow(troop.latitude - event.latitude, 2) +
            Math.pow(troop.longitude - event.longitude, 2)
        );

        if (distance < min) {
          closestTroop = troop;
          min = distance;
        }
      });

      const recommend = {
        title: "recommendad troops for event",
        content: `there is new event in location ${event.longitude}, ${event.latitude} the closest troops is in ${closestTroop.longitude}, ${closestTroop.latitude}`,
        color: "orange",
        isRemoveAble: true,
      };
      await recommendServiceRepository.save(recommend);
    } catch (e) {
      console.log(e);
    }
  };

  addHospitalRecommend = async (emergencyHospitals: EmergencyHospitalDto) => {
    try {
      const recommend = {
        title: `recommended hospitals for event ${emergencyHospitals.eventName}`,
        content: `you can send ${hospitalEventContent(emergencyHospitals)}`,
        color: "blue",
        isRemoveAble: true,
      };

      await recommendServiceRepository.save(recommend);
    } catch (e) {
      console.log(e);
    }
  };
}

const hospitalEventContent = (emergencyHospitals: EmergencyHospitalDto) => {
  let content = "";
  emergencyHospitals.hospitals.forEach((hospital) => {
    content += `\n${hospital.availableAmount} to ${hospital.name}`;
  });

  return content;
};
export default new RecommendService();
