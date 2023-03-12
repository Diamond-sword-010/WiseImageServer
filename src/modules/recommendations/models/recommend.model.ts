import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { RecommendDtoAll } from "../Dto/recommendad.dto";

/**
 * This class represent an entity in the DB.
 * Each field here is a field in the DB table.
 */
@Entity()
export class Recommend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  title: string;

  @Column("text")
  content: string;

  @Column("text")
  color: string;

  @Column()
  isRemoveAble: boolean;

  public static toDto = (recommend: Recommend) => {
    const dto: RecommendDtoAll = new RecommendDtoAll(recommend);
    return dto;
  };
}
