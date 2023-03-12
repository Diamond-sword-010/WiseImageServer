import { FORMERR } from 'dns';
import { getDistanceFromLatLonInKm, IsPointInPolygon } from '../../../utils/utils'
import { EventPoint } from '../Dto/eventPoint';
import { EventDto } from "../Dto/event.dto"
const MIN_POINT_AMOUNT = 4;
const MAX_DISTANCE_KM = 5;

const toEventPoint = (event: EventDto, oldIndex: number) => {
    return new EventPoint(event, oldIndex, [])
}

const getCorePoints = (events: EventDto[]) => {
    let corePoints = [];

    for(let currEventIndex = 0; currEventIndex < events.length; currEventIndex++) {
        const currPoint = toEventPoint(events[currEventIndex], currEventIndex);

        for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
            if(currEventIndex !== eventIndex) {
                const distance = getDistanceFromLatLonInKm(
                    events[currEventIndex].latitude, events[currEventIndex].longitude,
                    events[eventIndex].latitude, events[eventIndex].longitude
                )

                if (distance <= MAX_DISTANCE_KM) {
                    const connectedPoint = toEventPoint(events[eventIndex], eventIndex);
                    currPoint.connectedPoints.push(connectedPoint);
                }
            }
        }

        if(currPoint.connectedPoints.length >= MIN_POINT_AMOUNT) {
            corePoints.push(currPoint)
        }
    }

    return corePoints;
};

const addToCluster = (corePoints: EventPoint[], cluster: EventDto[], currPoint:EventPoint) => {

    const point = corePoints.find(point=> point.eventIndex === currPoint.eventIndex);

    if (point) {
        const coreIndex = corePoints.indexOf(point);
        corePoints.splice(coreIndex, 1);
    }

    currPoint.connectedPoints.forEach(point => {
        addToCluster(corePoints, cluster, point);
    })

    cluster.push(currPoint.event);
};

const getClusters = (corePoints: EventPoint[]) => {
    const clusters = [];
    let index = corePoints.length - 1;

    while(index != -1 && corePoints.length > 0) {
        const cluster = [];
        addToCluster(corePoints, cluster, corePoints[index])
        clusters.push(cluster)
        index = corePoints.length - 1;
    }

    return clusters;
};

export const clusterAlgorithem = (events: EventDto[]) => {
    const corePoints: EventPoint[] = getCorePoints(events);
    return getClusters(corePoints);
}