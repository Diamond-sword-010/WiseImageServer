import { Event } from "../../../modules/event/models/event.model";
import { HospitalDto } from "./hospital.dto";

export class EmergencyHospitalDto {
    eventName: string
    hospitals: HospitalDto[]

  constructor(hospitalEntity: HospitalDto[], eventEntity: Event) {
    this.eventName = eventEntity.name;
    this.hospitals = hospitalEntity
  }
}
