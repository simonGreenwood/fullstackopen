import { BaseEntry, Diagnosis, EntryWithoutId } from "./types";
import { isString, isDate, isNumber, isHealthCheckRating } from "./utils";
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

export const parseHealthCheckRating = (rating: unknown) => {
  console.log(typeof rating, rating, isNumber(rating));
  if (!isNumber(rating) || isNaN(rating) || !isHealthCheckRating(rating)) {
    throw new Error("invalid health check rating");
  }
  return rating;
};
export const parseDischarge = (discharge: unknown) => {
  if (!discharge) {
    return {};
  }
  if (typeof discharge !== "object") {
    throw new Error("invalid discharge");
  }
  if (!("date" in discharge)) {
    throw new Error("doesn't contain discharge date");
  }
  if (!("criteria" in discharge)) {
    throw new Error("doesn't contain discharge criteria");
  }
  if (!discharge.date || !isString(discharge.date) || !isDate(discharge.date)) {
    throw new Error("sick leave start date is not a date");
  }
  if (!discharge.criteria || !isString(discharge.criteria)) {
    throw new Error("discharge criteria is invalid");
  }
  return discharge;
};

export const parseSickLeave = (leave: unknown) => {
  if (!leave) {
    return {};
  }
  if (typeof leave !== "object") {
    throw new Error("invalid sick leave");
  }
  if (!("startDate" in leave)) {
    throw new Error("sick leave doesn't contain start date");
  }
  if (!("endDate" in leave)) {
    throw new Error("sick leave doesn't contain end date");
  }
  if (
    leave.startDate ||
    !isString(leave.startDate) ||
    !isDate(leave.startDate)
  ) {
    throw new Error("sick leave start date is not a date");
  }
  if (!leave.endDate || !isString(leave.endDate) || !isDate(leave.endDate)) {
    throw new Error("sick leave end date is not a date");
  }
  return leave;
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

export const toEntry = (entry: unknown): EntryWithoutId => {
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
        "diagnosisCodes" in entry ? parseDiagnosisCodes(entry) : [],
    };
    const parsedType = parseType(entry.type);
    switch (parsedType) {
      case "Hospital":
        if ("discharge" in entry && parseDischarge(entry.discharge)) {
          return {
            ...baseEntry,
            discharge: entry.discharge,
          };
        }
        throw new Error("discharge is missing");
      case "OccupationalHealthcare":
        if ("employerName" in entry) {
          return {
            ...baseEntry,
            employerName: entry.employerName,
            sickLeave:
              "sickLeave" in entry && parseSickLeave(entry.sickLeave)
                ? entry.sickLeave
                : [],
          };
        }
        throw new Error("employer name missing");
      case "HealthCheck":
        if (
          "healthCheckRating" in entry &&
          !isNaN(parseHealthCheckRating(entry.healthCheckRating))
        ) {
          return {
            ...baseEntry,
            healthCheckRating: entry.healthCheckRating,
          };
        }
        throw new Error("health check rating missing");
      default:
        assertNever(parsedType);
        return;
    }
  }
  throw new Error("invalid data");
};
