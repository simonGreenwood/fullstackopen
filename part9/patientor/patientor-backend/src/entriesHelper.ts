import { BaseEntry, Diagnosis, Entry } from "./types";
import { isString, isDate, isGender } from "./utils";
export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }
  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

export const parseDescription = (description: unknown) => {
  if (!description || !isString(description)) {
    throw new Error("invalid description");
  }
  return description;
};

export const parseDate = (date: unknown) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("invalid date");
  }
  return date;
};

export const parseSickLeaveStartDate = (date: unknown) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("invalid sick leave start date");
  }
  return date;
};

export const parseSickLeaveEndDate = (date: unknown) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("invalid sick leave end date");
  }
  return date;
};

export const parseSpecialist = (specialist: unknown) => {
  if (!specialist || !isString(specialist)) {
    throw new Error("invalid specialist");
  }
  return specialist;
};
export const parseType = (type: unknown) => {
  if (
    type !== "OccupationalHealthcare" &&
    type !== "HealthCheck" &&
    type !== "Hospital"
  ) {
    throw new Error("invalid type");
  }
  return type;
};
const assertNever = (value: never): never => {
  throw new Error(`${value} is an invalid type`);
};

export const toEntry = (entry: unknown) => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "description" in entry &&
    "date" in entry &&
    "specialist" in entry &&
    "type" in entry
  ) {
    const baseEntry: Omit<BaseEntry, "id"> = {
      description: parseDescription(entry.description),
      date: parseDate(entry.date),
      specialist: parseSpecialist(entry.specialist),
      diagnosisCodes:
        "diagnosisCodes" in entry
          ? parseDiagnosisCodes(entry.diagnosisCodes)
          : [],
    };
    const type = parseType(entry.type);
    switch (type) {
      case "Hospital":
        return {
          ...baseEntry,
        };
      case "OccupationalHealthcare":
        if ("employerName" in entry) {
          if ("sickLeave" in entry) {
            if parseSickLeaveEndDate(entry.sickLeave.endDate)
          }
          return {
            ...baseEntry,
            employerName: entry.employerName,
          };

        }
      case "HealthCheck":
        return {
          ...baseEntry,
        };
      default:
        assertNever(type);
    }
    console.log(baseEntry);
  }
};
