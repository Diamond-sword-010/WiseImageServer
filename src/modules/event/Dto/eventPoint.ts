import { EventDto } from "../Dto/event.dto";

export class EventPoint {
    event: EventDto
    eventIndex: number
    connectedPoints: EventPoint[]

    constructor( event: EventDto, eventIndex: number, connectedPoints: EventPoint[]) {
        this.event = event;
        this.eventIndex = eventIndex
        this.connectedPoints = connectedPoints
    }
}
