import patients from "../../data/patients";
import { Patient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";
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

export const addPatient = (patient: NewPatient): Patient[] => {
  const patientWithId = {
    id: uuid(),
    ...patient,
  };
  patients.push(patientWithId);
  return patients;
};
