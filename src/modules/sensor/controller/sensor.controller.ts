import { Request, Response } from "express";
import { SensorDto, SensorLocationDto, SensorsAmountDto } from "../Dto/sensor.dto";
import {  ObservationAreaDto } from "../Dto/observationArea.dto"
import getSensors from "../logic/getSensors";

class SensorController {
  /**
   * get all the examples Dtos and return them
   * @param req - the request from the world
   * @param res - the response we return
   */
  public getAllSensors = async (req: Request, res: Response) => {
    try {
      const examplesDto: SensorLocationDto[] = await getSensors.getAllSensors();
      res.status(200).send(examplesDto);
    } catch (err) {
      res.status(400).send();
    }
  };

  public getSensorById = async (req: Request, res: Response) => {
    try {
      const id: number = req.params.id;
      const sensorDto: SensorDto = await getSensors.getSensorById(id);
      res.status(200).send(sensorDto);
    } catch (err) {
      res.status(400).send();
    }
  };

  
  public getSensorObservationAreaById = async (req: Request, res: Response) => {
    try {
      const id: number = req.params.id;
      const ObservationAreaDtos: ObservationAreaDto[] = await getSensors.getSensorObservationAreaById(id);
      res.status(200).send(ObservationAreaDtos);
    } catch (err) {
      res.status(400).send();
    }
  };

  public getWorkingAndNotWorkingSensorsAmount = async (req: Request, res: Response) => {
    try {
      const sensorsAmountDto: SensorsAmountDto =
       await getSensors.getWorkingAndNotWorkingSensorsAmount();
      res.status(200).send(sensorsAmountDto);
    } catch (err) {
      res.status(400).send();
    }
  };
}
export default new SensorController();
