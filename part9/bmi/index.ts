import express from "express";
import { calculateBmi, calculateExercises } from "./webCalculatorHelper";
const app = express();
app.use(express.json());
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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, target } = req.body;
  if (!target || !dailyExercises) {
    return res.status(400).send({ error: "parameters missing" });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dailyExercisesArray = dailyExercises as any[];

  const exercisesAsNumbers = dailyExercisesArray.map((exercise) =>
    Number(exercise)
  );
  if (
    isNaN(Number(target)) ||
    exercisesAsNumbers.some((element) => isNaN(element))
  ) {
    return res.status(400).send({ error: "malformed parameters" });
  }

  const result = calculateExercises(exercisesAsNumbers, Number(target));
  return res.send(result);
});
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
