//import { parseArguments } from "./bmiCalculator";
import express from "express";
import { calculateBmi } from "./webCalculatorHelper";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;
  if (
    isNaN(Number(weight)) ||
    isNaN(Number(height)) ||
    typeof weight !== "string" ||
    typeof height !== "string"
  )
    return res.status(400).json({ error: "malformatted parameters" });

  return res.json(calculateBmi(Number(height), Number(weight)));
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
