import patients from "../../data/patients";
import { Patient, NewPatient, NonSensitivePatient, BaseEntry } from "../types";
import { v1 as uuid } from "uuid";
import { parseString } from "../patientHelper";
import {
  parseDate,
  parseDescription,
  parseDiagnosisCodes,
  parseSpecialist,
} from "../entriesHelper";
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

export const getPatientByID = (id: string): Patient => {
  const newPatient = patients.find((patient) => patient.id === id);
  if (!newPatient) {
    throw new Error("Patient not found");
  }
  return newPatient;
};
export const addPatient = (patient: NewPatient): Patient => {
  const patientWithId: Patient = {
    id: uuid(),
    ...patient,
  };
  // add patient to the array of patients but first retype it
  patients.push(patientWithId);
  return patientWithId;
};

export const addNewEntry = (entry: unknown, patientID: string) => {
  console.log(entry, patientID);
};
