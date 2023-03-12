import { Request, Response } from "express";
import { HospitalDto } from "../Dto/hospital.dto";
import getHospitals from "../logic/getHospitals";

class HospitalController {
  getAllHospitals = async (req: Request, res: Response) => {
    try {
      const hospitalsDto: HospitalDto[] = await getHospitals.getAllHospitals();
      res.status(200).send(hospitalsDto);
    } catch (error) {
      res.status(500).send();
    }
  };
}
export default new HospitalController();
