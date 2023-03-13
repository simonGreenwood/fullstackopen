import { handleError, isNotNumber } from "./utils";

const calculateBmi = (height: number, weight: number): string => {
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
const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Values aren't numbers!");
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  console.log(handleError(error));
}
