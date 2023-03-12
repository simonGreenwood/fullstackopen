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
console.log(calculateBmi(178, 9));
