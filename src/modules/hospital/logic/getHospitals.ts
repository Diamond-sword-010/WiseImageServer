import { Event } from "../../event/models/event.model";
import { EmergencyHospitalDto } from "../Dto/emergencyHospital.dto";
import { HospitalDto } from "../Dto/hospital.dto";
import { Hospital } from "../models/hospital.model";
import hospitalService from "../services/hospital.service";

class GetHospitalsLogic {
  getAllHospitals = async (): Promise<HospitalDto[]> => {
    const hospitals: Hospital[] = await hospitalService.getHospitals();
    const hospitalsDto: HospitalDto[] = hospitals.map((hospital) =>
      Hospital.toDto(hospital)
    );

    return hospitalsDto;
  };

  getClosestHospitals = async (event: Event): Promise<EmergencyHospitalDto> => {
    const hospitals: Hospital[] = await hospitalService.getHospitals();
    const sortedtHospitals: Hospital[] = hospitals.sort(
      (currHospital, nextHospital) =>
      calcDistance(currHospital, event) - calcDistance(nextHospital, event)
    );

    const closestHospitals: Hospital[] = getHospitalsByAvailableSpace(sortedtHospitals, event);

    const hospitalsDto: HospitalDto[] = closestHospitals.map((hospital) =>
      Hospital.toDto(hospital)
    );

    const emergencyHospitalsDto: EmergencyHospitalDto = new EmergencyHospitalDto(hospitalsDto, event)

    return emergencyHospitalsDto;
  };
}

const calcDistance = (hospital: Hospital, event: Event) =>
  Math.sqrt(
    Math.pow(hospital.latitude - event.latitude, 2) +
      Math.pow(hospital.longitude - event.longitude, 2)
  );

const getHospitalsByAvailableSpace = (hospitals: Hospital[], event: Event) => {
  let usedSpace = 0;
  const closestHospitals = [];
  
  for (const hospital of hospitals) {
    if (hospital.maxCapacity - hospital.currentAmount + usedSpace > event.injuredAmount) {
      break;
    }
    usedSpace += hospital.maxCapacity - hospital.currentAmount;
    closestHospitals.push(hospital);
  }

  return closestHospitals;
};

export default new GetHospitalsLogic();
