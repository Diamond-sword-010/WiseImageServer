import { EventDto } from "../Dto/event.dto";
import { Event } from "../models/event.model";
import { clusterAlgorithem } from "../Algorithems/cluster";
import eventService from "../services/event.service";
import { HotArea } from "../Dto/hotAra.dto";

export class GetEventsLogic {
  _toHotAreas = (clausters: EventDto[][]) => {
    return clausters.map(clauster => {
      return new HotArea(clauster);
    });
  }

  getAllEvents = async (): Promise<EventDto[]> => {
      const events: Event[] = await eventService.getEvents();
      const eventsDto: EventDto[] = events.map((event) => Event.toDto(event));
      return eventsDto;
  };

  getEventById = async (id: number): Promise<EventDto> => {
      const event: Event = await eventService.getEventById(id);
      const eventDto: EventDto = Event.toDto(event);
      return eventDto;
  };

  getHotAreas = async(): Promise<HotArea[]> => {
    const events: Event[] = await eventService.getEvents();
    const eventsDto: EventDto[] = events.map((event) => Event.toDto(event));
    return this._toHotAreas(clusterAlgorithem(eventsDto));
  }
}

export default new GetEventsLogic();
