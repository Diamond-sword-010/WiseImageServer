import { Event } from "../models/event.model";
import { EventObjectDto } from "../dto/event.dto";
import eventService from "../services/event.service";

class saveEventsLogic {
  saveEvent = async (event: string) => {
    try {
      const eventToSave: any = JSON.parse(event);
      const eventParsed: any = Event.toDtoFromAny(eventToSave);
      eventParsed.injuredAmount = Math.round(Math.random() * (30 - 5) + 5);

      await eventService.saveEvent(eventParsed);

      return eventToSave;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new saveEventsLogic();
