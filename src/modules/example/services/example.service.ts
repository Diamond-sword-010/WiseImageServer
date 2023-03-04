import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Example } from "../models/example.model"

// get the Repoistory of the Entity 
const exampleRepository: Repository<Example> = AppDataSource.getRepository(Example);

/**
 * This class is responsible to access the DB.
 */
class ExampleService {
    
    /**
     * get all the examples from db
     * @returns - all the exmaples entities from the db
     */
    getExmaple = async (): Promise<Example[]> => {
        try {
           const data: Example[] = await exampleRepository.find();
           return data;
        }
        catch (e) {
            console.log(e);
        }
    }
}

export default new ExampleService();