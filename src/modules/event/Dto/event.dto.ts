import { Event } from "../models/event.model";

export class EventDto {
  latitude: number;
  longitude: number;
  name: string;

  constructor(eventEntity: Event) {
    this.latitude = eventEntity.latitude;
    this.longitude = eventEntity.longitude;
    this.name = eventEntity.name;
  }
}

export class EventObjectDto {
  latitude: number;
  longitude: number;
  name: string;

  // Problem with other squad - longitude and latitude reversed - fix currently
  constructor(eventEntity: any) {
    this.latitude = eventEntity.longitude;
    this.longitude = eventEntity.latitude;
    this.name = eventEntity.title;
  }
}
