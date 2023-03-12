const calculateExercises = (hours: number[], target:number) => {
  const average: number = hours.reduce((a,b) => a + b, 0)/hours.length;

  const rating: number = 1
  return {
    periodLength: hours.length,
    trainingDays: hours.filter(day => day > 0).length,
    success: average >= target,
    rating: 2,
    ratingDescription: 'not too bad but could be better',
    target: target,
    average: average
  }
}
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2));
/*{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 }*/