import patients from "../../data/patients";
import { Patient, NewPatient, NonSensitivePatient } from "../types";
import { v1 as uuid } from "uuid";
export const getAllPatients = (): Patient[] => {
  return patients;
};
export const getAllPatientsWithoutSSN = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const getPatientByID = (id): NonSensitivePatient => {
  const newPatient = 
}
export const addPatient = (patient: NewPatient): Patient[] => {
  const patientWithId = {
    id: uuid(),
    ...patient,
  };
  patients.push(patientWithId);
  return patients;
};
