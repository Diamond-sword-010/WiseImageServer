import { ExampleDto } from "../Dto/example.dto";
import { Example } from "../models/example.model";
import exampleService from "../services/example.service";

/**
 * This class is responsible for the logic of the moudule.
 * For example - excute transformation, calcualtion and etc...
 */
class GetExmaplesLogic {

    getAllExamples = async (): Promise<ExampleDto[]> => {
        const examples: Example[] = await exampleService.getExmaple();
        const examplesDto: ExampleDto[] = examples.map((b) => b.toDto());
        return examplesDto;
    }

}

export default new GetExmaplesLogic();  