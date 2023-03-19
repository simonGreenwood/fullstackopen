import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const isGender = (newGender: string): newGender is Gender => {
  return Object.values(Gender)
    .map((gender) => gender.toString())
    .includes(newGender);
};

const parseName = (name: unknown) => {
  if (!name || !isString(name)) {
    throw new Error("invalid name");
  }
  return name;
};
const parseDateOfBirth = (date: unknown) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("invalid date");
  }
  return date;
};
const parseOccupation = (occupation: unknown) => {
  if (!occupation || !isString(occupation)) {
    throw new Error("invalid occupation");
  }
  return occupation;
};
const parseSSN = (ssn: unknown) => {
  if (!ssn || !isString(ssn)) {
    throw new Error("invalid SSN");
  }
  return ssn;
};
const parseGender = (gender: unknown) => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("invalid gender");
  }
  return gender;
};
export const toNewPatient = (patient: unknown): NewPatient => {
  if (!patient || typeof patient !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in patient &&
    "dateOfBirth" in patient &&
    "ssn" in patient &&
    "gender" in patient &&
    "occupation" in patient
  ) {
    const newPatient: NewPatient = {
      name: parseName(patient.name),
      dateOfBirth: parseDateOfBirth(patient.dateOfBirth),
      ssn: parseSSN(patient.ssn),
      gender: parseGender(patient.gender),
      occupation: parseOccupation(patient.occupation),
    };
    return newPatient;
  }
  throw new Error("fields are missing");
};

/*
  {
      "id": "d2773c6e-f723-11e9-8f0b-362b9e155667",
      "name": "Matti Luukkainen",
      "dateOfBirth": "1971-04-09",
      "ssn": "090471-8890",
      "gender": "male",
      "occupation": "Digital evangelist"
  }

*/
/*

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility)
    .map((v) => v.toString())
    .includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error("Incorrect or missing visibility: " + visibility);
  }
  return visibility;
};
*/
