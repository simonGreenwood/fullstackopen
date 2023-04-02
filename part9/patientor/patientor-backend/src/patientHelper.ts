<<<<<<< HEAD
import { NewPatient, NonSensitivePatient, Entry } from "./types";
import { isString, isDate, isGender } from "./utils";
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

const parseID = (id: unknown) => {
  if (!id || !isString(id)) {
    throw new Error("invalid id");
  }
  return id;
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
    const entries: Entry[] = [];
    const newPatient: NewPatient = {
      name: parseName(patient.name),
      dateOfBirth: parseDateOfBirth(patient.dateOfBirth),
      ssn: parseSSN(patient.ssn),
      gender: parseGender(patient.gender),
      occupation: parseOccupation(patient.occupation),
      entries,
    };
    return newPatient;
  }
  throw new Error("fields are missing");
};

export const toNonSensitivePatient = (
  patient: unknown
): NonSensitivePatient => {
  if (!patient || typeof patient !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "id" in patient &&
    "name" in patient &&
    "dateOfBirth" in patient &&
    "ssn" in patient &&
    "gender" in patient &&
    "occupation" in patient
  ) {
    const nonSensitivePatient: NonSensitivePatient = {
      id: parseID(patient.id),
      name: parseName(patient.name),
      dateOfBirth: parseDateOfBirth(patient.dateOfBirth),
      gender: parseGender(patient.gender),
      occupation: parseOccupation(patient.occupation),
    };
    return nonSensitivePatient;
  }
  throw new Error("fields are missing");
=======
import { Gender } from "./types";
export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
export const isGender = (newGender: string): newGender is Gender => {
  return Object.values(Gender)
    .map((gender) => gender.toString())
    .includes(newGender);
>>>>>>> aebdeb6bc819a745d3cabe8bca8e4910a076773c
};
