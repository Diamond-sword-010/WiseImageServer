import { Example } from "../models/example.model";

/**
 * This class represent a smaller part of the entity.
 * Its includes only the relavnt fields we want to display.
 */
export class ExampleDto {
    id: number;
    name: string;
    description: string; 

    constructor(exampleEntity: Example) {
        this.id = exampleEntity.id;
        this.name = exampleEntity.name;
        this.description = exampleEntity.description;
    }
}