import { Request, Response } from "express";
import { RecommendDtoAll, RecommendDto } from "../Dto/recommendad.dto";
import getRecommend from "../logic/getRecommend";

/**
 * This class responsible to accept request and send respones.
 */
class RecommendController {
  /**
   * get all the examples Dtos and return them
   * @param req - the request from the world
   * @param res - the response we return
   */
  getAllRecommends = async (req: Request, res: Response) => {
    try {
      const RecommendDto: RecommendDtoAll[] = await getRecommend.getAllRecommends();
      res.status(200).send(RecommendDto);
    } catch {
      res.status(500).send();
    }
  };

  getRecommendationsToMoveSolidersBetweenHtmrs = async (req: Request, res: Response) => {
    try {
      const RecommendDto: RecommendDto[] = await getRecommend.getRecommendationsToMoveSolidersBetweenHtmrs();
      res.status(200).send(RecommendDto);
    } catch {
      res.status(500).send();
    }
  };
  getHotAreasRecommends = async (req: Request, res: Response) => {
    try {
      const recommends: RecommendDto[] = await getRecommend.getHotAreaReccomendations()
      res.status(200).send(recommends);
    } catch {
      res.status(500).send();
    }
  }

}
export default new RecommendController();
