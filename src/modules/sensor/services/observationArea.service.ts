import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { ObservationArea } from "../models/observationArea.model";

// get the Repoistory of the Entity
const observationAreaRepository: Repository<ObservationArea> =
  AppDataSource.getRepository(ObservationArea);

class ObservationAreaService {
  /**
   * get all the sensors from db
   * @returns - all the sensor entities from the db
   */
  public getObservationAreaByName = async (
    name: string
  ): Promise<ObservationArea[]> => {
    try {
      console.log(name);
      const data = await observationAreaRepository.findBy({ areaName: name });
      console.log("b");
      return data;
    } catch (e) {
      console.log(e);
    }
  };
}

export default new ObservationAreaService();
