import { Request, Response } from "express";
import { HtmrDto, HtmrsSecurityLevelAmountsDto, EventsInHtmrDto, HtmrWithSolidersAmountDto } from "../../htmr/Dto/htmrDto";
import GetHtmrLogic from "../logic/htmrLogic";

/**
 * This class responsible to accept request and send respones.
 */
class HtmrController {
  /**
   * get all the examples Dtos and return them
   * @param req - the request from the world
   * @param res - the response we return
   */
  getAllHtmr = async (req: Request, res: Response) => {
    try {
         const htmrDto: HtmrDto[] = await GetHtmrLogic.getAllHtmr();
        res.status(200).send(htmrDto);
      } catch {
        res.status(500).send();
      }
}

getHtmrSecurityLevelAmounts = async (req: Request, res: Response) => {
  try {
      const htmrDto: HtmrsSecurityLevelAmountsDto = 
      await GetHtmrLogic.getHtmrSecurityLevelAmounts();
      res.status(200).send(htmrDto);
    } catch {
      res.status(500).send();
    }
}

getEventsAmountInHtmrs = async (req: Request, res: Response) => {
  try {
      const htmrDto: EventsInHtmrDto[] = 
      await GetHtmrLogic.getEventsAmountInHtmrs();
      res.status(200).send(htmrDto);
    } catch {
      res.status(500).send();
    }
}

getSoliders = async (req: Request, res: Response) => {
  try {
      const htmrDto: HtmrWithSolidersAmountDto[] = await GetHtmrLogic.getHtmrsWithSolidersAmount();
      res.status(200).send(htmrDto);
    } catch {
      res.status(500).send();
    }
}

}
export default new HtmrController();