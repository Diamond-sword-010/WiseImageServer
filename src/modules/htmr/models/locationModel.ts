import { Entity, Column, PrimaryGeneratedColumn, Double } from "typeorm";
import { locationDto } from "../Dto/locationsDto";

/**
 * This class represent an entity in the DB.
 * Each field here is a field in the DB table.
 */
@Entity()
export class locationHtmr {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  htmrId: number;

  @Column("float")
  latitude : Double

  @Column("float")
  longtitude : Double

  toDto = () => {
    const dto: locationDto = new locationDto(this);
    return dto;
}
}