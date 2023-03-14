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
