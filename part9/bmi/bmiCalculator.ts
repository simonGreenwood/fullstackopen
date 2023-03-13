const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;
  if (bmi < 20) {
    return "Underweight (unhealthy weight)";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else {
    return "Overweight (unhealthy weight)";
  }
};
interface MultiplyValues {
  height: number;
  weight: number;
}
const parseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: args[2],
      weight: args[3],
    };
  } else {
    throw new Error("Values aren't numbers!");
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(Number(height), Number(weight)));
} catch (error: unknown) {
  let errorMessage = "something went wrong";
  if (error instanceof Error) {
    errorMessage += error;
  }
  console.log(errorMessage);
}
