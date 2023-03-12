import { Entity, Column, PrimaryGeneratedColumn, Double, PrimaryColumn } from "typeorm";
import { HtmrDto } from "../Dto/htmrDto";
import { locationDto } from "../Dto/locationsDto";

/**
 * This class represent an entity in the DB.
 * Each field here is a field in the DB table.
 */
@Entity()
export class Htmr {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column("float")
  securityLevel : Double

  toDto = (locations: locationDto[]) => {
    const dto: HtmrDto = new HtmrDto(this, locations);
    return dto;
}


}