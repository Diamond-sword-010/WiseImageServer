import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { ExampleDto } from "../Dto/example.dto"

/**
 * This class represent an entity in the DB.
 * Each field here is a field in the DB table.
 */
@Entity()
export class Example {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    name: string

    @Column("text")
    description: string

    @Column()
    filename: string

    @Column()
    isPublished: boolean

    toDto = () => {
        const dto: ExampleDto = new ExampleDto(this);
        return dto;
    }

}