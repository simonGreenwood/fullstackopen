import { isNotNumber } from "./utils";
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

  let rating: number = 0;
  let ratingDescription: string = "";

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
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
console.log(process.argv.slice(3));

const parseArguments = (args: string[]): Exercises => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const hours: number[] = args.slice(3).map((hour) => Number(hour));
  const target: number = Number(args[2]);

  if (!isNotNumber(args[2])) {
    return {
      hours,
      target,
    };
  }
};
