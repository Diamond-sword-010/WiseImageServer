import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Hospital } from "../models/hospital.model";

const hospitalRepository: Repository<Hospital> = AppDataSource.getRepository(Hospital);

class HospitalService {
  getHospitals = async (): Promise<Hospital[]> => {
    try {
      const data: Hospital[] = await hospitalRepository.find();

      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new HospitalService();
