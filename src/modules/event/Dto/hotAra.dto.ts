import { EventDto } from "../Dto/event.dto";

export class HotArea {
    sensorLatitude: number
    sensorLongitde: number
    eventAmount: number

    constructor(events: EventDto[]) {
        const lats = events.map(event => event.latitude);
        const longs = events.map(event => event.longitude);

        this.sensorLatitude = this.calcAvg(lats);
        this.sensorLongitde = this.calcAvg(longs);
        this.eventAmount = events.length;
    }

    calcAvg = (values: number[]) => {
        return values.reduce((sum, curr) => sum + curr, 0) / values.length;
    }
}