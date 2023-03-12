import { Request, Response } from "express";
import { EventDto } from "../Dto/event.dto";
import getEvents from "../logic/getEvents";
import { HotArea } from "../Dto/hotAra.dto";

class EventController {
  getAllEvents = async (req: Request, res: Response) => {
    try {
      const eventsDto: EventDto[] = await getEvents.getAllEvents();
      res.status(200).send(eventsDto);
    } catch (error) {
      res.status(500).send();
    }
  };

  getEventById = async (req: Request, res: Response) => {
    try {
      const eventsDto: EventDto = await getEvents.getEventById(req.params.id);
      res.status(200).send(eventsDto);
    } catch (error) {
      res.status(400).send();
    }
  };

  // getHotAreas = async (req: Request, res: Response) => {
  //   try {
  //     const hotAreas: HotArea[] = await getEvents.getHotAreas();
  //     res.status(200).send(hotAreas);
  //   } catch (error) {
  //     res.status(500).send();
  //   }
  // };
}
export default new EventController();
