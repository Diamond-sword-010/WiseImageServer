import { ObservationAreaDto } from "../Dto/observationArea.dto";
import {
  SensorDto,
  SensorLocationDto,
  SensorsAmountDto,
} from "../Dto/sensor.dto";
import { ObservationArea } from "../models/observationArea.model";
import { Sensor } from "../models/sensor.model";
import observationAreaService from "../services/observationArea.service";
import sensorService from "../services/sensor.service";

class GetSensorsLogic {
  getAllSensors = async (): Promise<SensorLocationDto[]> => {
    const sensors: Sensor[] = await sensorService.getAllSensors();
    const sensorsDto: SensorLocationDto[] = sensors.map((sensor) =>
      Sensor.toLocationDto(sensor)
    );
    return sensorsDto;
  };
  getSensorById = async (id: number): Promise<SensorDto> => {
    const sensor = await sensorService.getSensorById(id);
    const sensorName: string = sensor.observationArea;

    const sensorDto: SensorDto = await Sensor.toSensorDto(sensor);
    return sensorDto;
  };

  getSensorObservationAreaById = async (id: number): Promise<ObservationAreaDto[]> => {
    const sensor = await sensorService.getSensorById(id);
    const sensorName: string = sensor.observationArea;

    const observationArea: ObservationArea[] =
      await observationAreaService.getObservationAreaByName(sensorName);

    const observationAreaDto: ObservationAreaDto[] = observationArea.map(
      (observationArea) => ObservationArea.toObservationAreaDto(observationArea)
    );
    return observationAreaDto;
  };

  getWorkingAndNotWorkingSensorsAmount =
    async (): Promise<SensorsAmountDto> => {
      const sensors: Sensor[] = await sensorService.getAllSensors();
      const workingSensorsAmount = sensors.filter(
        (sensor) => sensor.isWorking
      ).length;
      const notWorkingSensorsAmount = sensors.length - workingSensorsAmount;
      const sensorsDto: SensorsAmountDto = new SensorsAmountDto(
        workingSensorsAmount,
        notWorkingSensorsAmount
      );
      return sensorsDto;
    };
}

export default new GetSensorsLogic();
