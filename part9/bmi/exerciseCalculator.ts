import { handleError, isNotNumber } from "./utils";
interface CalculatedExercises {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface Exercises {
  target: number;
  hours: number[];
}
const calculateExercises = (
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

const parseArguments = (args: string[]): Exercises => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const hours = args.slice(3).map((hour) => {
    const asNumber = Number(hour);
    if (!isNotNumber(hour)) return asNumber;
    else throw new Error("Values aren't numbers!");
  });

  const target = Number(args[2]);

  if (!isNotNumber(target)) {
    return {
      hours,
      target,
    };
  } else {
    throw new Error("Values aren't numbers!");
  }
};

try {
  const { hours, target } = parseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  console.log(handleError(error));
}
