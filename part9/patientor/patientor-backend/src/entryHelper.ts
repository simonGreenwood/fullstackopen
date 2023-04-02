import { Entry } from "./types";
export const toNewEntry = (entry: unknown): Entry => {
  if (!entry || typeof entry !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("date" in entry && "specialist" in entry && "description" in entry) {
    if ("employerName" in entry && "sickLeave") {
      //occupational healthcare
    } else if (
      "description" in entry &&
      "discharge" in entry &&
      "diagnosisCodes" in entry
    ) {
      // hospital healthcare
    }
  }
  throw new Error("fields are missing");
};
/*
id: "fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62",
date: "2019-09-10",
specialist: "MD House",
type: "OccupationalHealthcare",
employerName: "FBI",
description: "Prescriptions renewed.",
*/
