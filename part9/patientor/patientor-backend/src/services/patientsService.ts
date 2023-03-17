import patients from "../../data/patients";
import { Patient } from "../types";
export const getAllPatients = (): Patient[] => {
  return patients;
};
export const getAllPatientsWithoutSSN = (): Omit<Patient, "ssn">[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
