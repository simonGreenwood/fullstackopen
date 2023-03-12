const calculateExercises = (hours: number[], target: number) => {
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
