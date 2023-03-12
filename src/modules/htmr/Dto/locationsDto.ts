import { locationHtmr } from "../models/locationModel";
import { Double } from "typeorm";

/**
 * This class represent a smaller part of the entity.
 * Its includes only the relavnt fields we want to display.
 */
export class locationDto {
    latitude: Double;
    longtitude: Double;

  
    constructor(locationsEntity: locationHtmr) {
      this.latitude = locationsEntity.latitude;
      this.longtitude = locationsEntity.longtitude;

    }
  }
