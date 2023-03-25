import {
  addPatient,
  getPatientByID,
  getAllPatientsWithoutSSN,
} from "../services/patientsService";
import express from "express";
import { toNewPatient } from "../utils";
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
    const addedEntry = addPatient(newPatient);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "something went wrong, ";
    if (error instanceof Error) {
      errorMessage += `Error: ${error}`;
    }
    res.status(400).send(errorMessage);
  }
});
export default router;
