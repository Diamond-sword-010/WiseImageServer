import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Htmr } from "../models/htmrModel";

// get the Repoistory of the Entity
const htmrRepository: Repository<Htmr> =
  AppDataSource.getRepository(Htmr);

/**
 * This class is responsible to access the DB.
 */
class HtmrService {
  /**
   * get all the examples from db
   * @returns - all the exmaples entities from the db
   */
  getHtmrs = async (): Promise<Htmr[]> => {
    try {
      const data: Htmr[] = await htmrRepository.find();
      return data;
    } catch (e) {
      console.log(e);
    }
  };

}

export default new HtmrService();
