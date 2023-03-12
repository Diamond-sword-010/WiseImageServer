import { Hospital } from "../models/hospital.model";

export class HospitalDto {
    latitude: number
    longitude: number
    name: string
    availableAmount: number

  constructor(hospitalEntity: Hospital) {
    this.latitude = hospitalEntity.latitude;
    this.longitude = hospitalEntity.longitude;
    this.name = hospitalEntity.name;
    this.availableAmount = hospitalEntity.maxCapacity - hospitalEntity.currentAmount;
  }
}
