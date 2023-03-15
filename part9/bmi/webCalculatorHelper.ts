import { isNotNumber } from "./utils";
export const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;
  if (bmi < 20) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else {
    return "Overweight";
  }
};
interface BmiValues {
  height: number;
  weight: number;
}

export const parseArguments = (weight: string, height: string): BmiValues => {
  if (!isNotNumber(weight) && !isNotNumber(height)) {
    return {
      height: Number(weight),
      weight: Number(height),
    };
  } else {
    throw new Error("Values aren't numbers!");
  }
};

interface CalculatedExercises {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  hours: number[],
  target: number
): CalculatedExercises => {
  const average: number = hours.reduce((a, b) => a + b, 0) / hours.length;

  let rating = 0;
  let ratingDescription = "";

  if (average > target) {
    rating = 3;
    ratingDescription = "very good, well done";
  } else if (average > target * 0.8) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "not good enough, try again next week";
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((day) => day > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};
