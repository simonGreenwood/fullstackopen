import {
  addPatient,
  getPatientByID,
  getAllPatientsWithoutSSN,
  addNewEntry,
} from "../services/patientsService";
import express from "express";
import { toNewPatient } from "../patientHelper";
import { toEntry } from "../entriesHelper";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getAllPatientsWithoutSSN());
});

router.get("/:id", (req, res) => {
  try {
    const patient = getPatientByID(req.params.id);
    res.json(patient);
  } catch (error: unknown) {
    let errorMessage = "something went wrong, ";
    if (error instanceof Error) {
      errorMessage += `${error}`;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "something went wrong, ";
    if (error instanceof Error) {
      errorMessage += `${error}`;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toEntry(req.body);
    const addedEntry = addNewEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "something went wrong, ";
    if (error instanceof Error) {
      errorMessage += `${error}`;
    }
    res.status(400).send(errorMessage);
  }
});
export default router;
