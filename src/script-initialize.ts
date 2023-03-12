import { AppDataSource } from "./data-source";
import { Htmr } from "./modules/htmr/models/htmrModel";
import { locationHtmr } from "./modules/htmr/models/locationModel";
import { Hospital } from "./modules/hospital/models/hospital.model";
import { ObservationArea } from "./modules/sensor/models/observationArea.model";
import { Sensor } from "./modules/sensor/models/sensor.model";
import { Troops } from "./modules/troops/models/troops.model";
import { Repository } from "typeorm";

module.exports = {
  initialTroops: async () => {
    const { troopsData } = require("./modules/troops/script/troopsData");
    const troopsRepository: Repository<Troops> =
      AppDataSource.getRepository(Troops);
    await troopsRepository.delete({});
    await troopsRepository.save(troopsData);
  },

  initialSensors: async () => {
    const { sensorData } = require("./modules/sensor/script/script");
    const sensorRepository: Repository<Sensor> =
      AppDataSource.getRepository(Sensor);
    await sensorRepository.delete({});
    await sensorRepository.save(sensorData);
  },

  initialObservationArea: async () => {
    const { observationAreaData } = require("./modules/sensor/script/script");
    const observationAreaRepository: Repository<ObservationArea> =
      AppDataSource.getRepository(ObservationArea);
    await observationAreaRepository.delete({});
    await observationAreaRepository.save(observationAreaData);
  },

  initialHtmr: async () => {
    const { htmrData } = require("./modules/htmr/script/script");
    const htmrRepository: Repository<Htmr> = AppDataSource.getRepository(Htmr);
    await htmrRepository.delete({});
    await htmrRepository.save(htmrData);
  },

  initialLocationHtmr: async () => {
    const {
      locationHtmrData,
    } = require("./modules/htmr/script/locationScript");
    const locationHtmrRepository: Repository<locationHtmr> =
      AppDataSource.getRepository(locationHtmr);
    await locationHtmrRepository.delete({});
    await locationHtmrRepository.save(locationHtmrData);
  },

  initialHospitals: async () => {
    const { hospitalsData } = require("./modules/hospital/script/hospitalsData");
    const hospitalRepository: Repository<Hospital> =
      AppDataSource.getRepository(Hospital);
    await hospitalRepository.delete({});
    await hospitalRepository.save(hospitalsData);
  },
};
