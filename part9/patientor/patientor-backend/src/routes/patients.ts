import { getAllPatientsWithoutSSN } from "../services/patientsService";
import express from "express";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getAllPatientsWithoutSSN());
});
export default router;
