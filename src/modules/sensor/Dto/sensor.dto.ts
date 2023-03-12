import { Sensor } from "../models/sensor.model";
import { ObservationAreaDto } from "./observationArea.dto";

export class SensorDto {
  name: string;
  observationAreaName: string;
  isWorking: boolean;
  longitude: number;
  latitude: number;

  constructor(sensorEntity: Sensor) {
    this.name = sensorEntity.name;
    this.observationAreaName = sensorEntity.observationArea;
    this.isWorking = sensorEntity.isWorking;
    this.longitude = sensorEntity.longitude;
    this.latitude = sensorEntity.latitude;
  }
}

export class SensorLocationDto {
  id: number;
  longitude: number;
  latitude: number;
  isWorking: boolean;

  constructor(sensorEntity: Sensor) {
    this.id = sensorEntity.id;
    this.longitude = sensorEntity.longitude;
    this.latitude = sensorEntity.latitude;
    this.isWorking = sensorEntity.isWorking;
  }
}

export class SensorsAmountDto {
  workingAmount: number;
  notWorkingAmout: number;

  constructor(workingAmount: number, notWorkingAmout: number) {
    this.workingAmount = workingAmount;
    this.notWorkingAmout = notWorkingAmout;
  }
}
