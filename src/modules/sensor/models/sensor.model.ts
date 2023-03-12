import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { SensorDto, SensorLocationDto } from "../Dto/sensor.dto";
import { ObservationAreaDto } from "../Dto/observationArea.dto";

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("text")
  observationArea: string;

  @Column("boolean")
  isWorking: boolean;

  @Column("float")
  longitude: number;

  @Column("float")
  latitude: number;

  public static toSensorDto = (
    sensor: Sensor,
  ) => {
    const dto: SensorDto = new SensorDto(sensor);
    return dto;
  };

  public static toLocationDto = (sensor: Sensor) => {
    const dto: SensorLocationDto = new SensorLocationDto(sensor);
    return dto;
  };
}
