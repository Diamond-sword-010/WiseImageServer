import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Event } from "../models/event.model";

const eventRepository: Repository<Event> = AppDataSource.getRepository(Event);

class EventService {
  getEvents = async (): Promise<Event[]> => {
    try {
      const data: Event[] = await eventRepository.find();

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  getEventById = async (id: number): Promise<Event> => {
    try {
      const data: Event = await eventRepository.findOneBy({
        id: id,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  saveEvent = async (event: Event) => {
    try {
      await eventRepository.save(event);
    } catch (error) {
      console.log(error);
    }
  };
}

export default new EventService();
