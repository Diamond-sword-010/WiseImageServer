import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { SensorLocationDto } from "../Dto/sensor.dto";
import { Sensor } from "../models/sensor.model";

// get the Repoistory of the Entity
const sensorRepository: Repository<Sensor> =
  AppDataSource.getRepository(Sensor);

class SensorService {
  /**
   * get all the sensors from db
   * @returns - all the sensor entities from the db
   */
  public getAllSensors = async (): Promise<Sensor[]> => {
    try {
      const data: Sensor[] = await sensorRepository.find();
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  public getSensorById = async (id: number): Promise<Sensor> => {
    try {
      const data: Sensor = await sensorRepository.findOneBy({
        id: id,
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  };
}

export default new SensorService();
