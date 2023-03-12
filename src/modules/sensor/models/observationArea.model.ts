import { Entity, PrimaryGeneratedColumn, Column, } from "typeorm";
import { ObservationAreaDto } from "../Dto/observationArea.dto";

@Entity()
export class ObservationArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  areaName: string;

  @Column("float")
  longitude: number;

  @Column("float")
  latitude: number;

  public static toObservationAreaDto = (observationArea: ObservationArea) => {
    const dto = new ObservationAreaDto(observationArea);
    return dto;
  };
}
