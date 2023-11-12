interface ExerciseValues {
  hrs: number[];
  target: number;
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  // if (args.length > 4) throw new Error('Too many arguments');

  for(const x of args.slice(3)){
    if(isNaN(Number(x))){
      throw new Error('Provided values were not numbers!');
    }
  }

  const target: number = Number(args[2])
  const exerciseHrs: string[] = args.slice(3)

  return {
    hrs: exerciseHrs.map(x => Number(x)),
    target
  }
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number
}

const calculateExercises = (hrs: number[], target: number) : Result => {
  const average: number = hrs.reduce((accumulator, initialValue) => accumulator + initialValue, 0) / hrs.length

  let rating: number
  let ratingDescription: string

  if(average < target/3){
    rating = 1
    ratingDescription = 'try harder'
  }
  else if(average < target){
    rating = 2
    ratingDescription = 'not too bad but could be better'
  }
  else{
    rating = 3
    ratingDescription = 'excellent, keep it up'
  }

  return {
    periodLength: hrs.length,
    trainingDays: hrs.filter(x => x !== 0).length,
    success: average >= target ? true : false,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  const { hrs, target } = parseExerciseArguments(process.argv)
  console.log(calculateExercises(hrs, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

