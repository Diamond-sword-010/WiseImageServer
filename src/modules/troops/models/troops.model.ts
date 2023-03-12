import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { TroopsDto } from "../Dto/troops.location.dto";
import { TroopsDtoAll } from "../Dto/troops.dto";
import { Min, Max } from "class-validator";

/**
 * This class represent an entity in the DB.
 * Each field here is a field in the DB table.
 */
@Entity()
export class Troops {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  @Min(10)
  @Max(15)
  phone: string;

  @Column("text")
  commander: string;

  @Column("int")
  amount: number;

  @Column("text")
  base: string;

  @Column("text")
  type: string;

  @Column("float")
  longitude: number;

  @Column("float")
  latitude: number;

  public static toLocationDto = (troops: Troops) => {
    const dto: TroopsDto = new TroopsDto(troops);
    return dto;
  };

  public static toDto = (troops: Troops) => {
    const dto: TroopsDtoAll = new TroopsDtoAll(troops);
    return dto;
  };
}
