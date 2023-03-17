import { getAllDiagnoses } from "../services/diagnosesService";
import express from "express";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getAllDiagnoses());
});
export default router;
