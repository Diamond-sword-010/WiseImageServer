import { ObservationArea } from "../models/observationArea.model";

export class ObservationAreaDto {
  longitude: number;
  latitude: number;

  constructor(observationAreaEntity: ObservationArea) {
    this.longitude = observationAreaEntity.longitude;
    this.latitude = observationAreaEntity.latitude;
  }
}
