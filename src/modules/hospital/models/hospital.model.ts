import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { HospitalDto } from "../Dto/hospital.dto"


@Entity()
export class Hospital {
    @PrimaryGeneratedColumn()
    id: number

    @Column("float")
    latitude: number

    @Column("float")
    longitude: number

    @Column("text")
    name: string

    @Column("int")
    maxCapacity: number

    @Column("int")
    currentAmount: number

    public static toDto = (hospital: Hospital) => {
        const dto: HospitalDto = new HospitalDto(hospital);
        return dto;
    }
}