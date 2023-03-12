import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { locationHtmr } from "../models/locationModel";

// get the Repoistory of the Entity
const locationsRepository: Repository<locationHtmr> =
  AppDataSource.getRepository(locationHtmr);

/**
 * This class is responsible to access the DB.
 */
class locationService {
  /**
   * get all the examples from db
   * @returns - all the exmaples entities from the db
   */
  getlocations = async (): Promise<locationHtmr[]> => {
    try {
      const data: locationHtmr[] = await locationsRepository.find();
      return data;
    } catch (e) {
      console.log(e);
    }
  };

}

export default new locationService();
