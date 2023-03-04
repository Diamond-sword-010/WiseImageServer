import { Request, Response } from "express";
import { ExampleDto } from "../Dto/example.dto";
import getExamples from "../logic/getExamples";

/**
 * This class responsible to accept request and send respones.
 */
class ExampleController {

    /**
     * get all the examples Dtos and return them
     * @param req - the request from the world
     * @param res - the response we return
     */
    getAllExamples = async (req: Request, res: Response) => {
        console.log("got here");
        const examplesDto: ExampleDto[] = await getExamples.getAllExamples();
        res.status(200).send(examplesDto);
    }

}
export default new ExampleController();