import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { EventDto, EventObjectDto } from "../Dto/event.dto";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("float")
  latitude: number;

  @Column("float")
  longitude: number;

  @Column("text")
  name: string;

  @Column("int")
  injuredAmount: number;

  public static toDto = (event: Event) => {
    const dto: EventDto = new EventDto(event);
    return dto;
  };

  public static toDtoFromAny = (literalEvent) => {
    const dto: EventDto = new EventObjectDto(literalEvent);
    return dto;
  };
}
