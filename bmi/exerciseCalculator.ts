interface ExerciseValues {
  exerciseHrs: number[];
  target: number
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const exerciseHrs : string[] = args.slice(2, args.length)
  for(const x of exerciseHrs){
    if(isNaN(Number(x))){
      throw new Error('Provided values were not numbers!');
    }
  }
  
  return {
    exerciseHrs: exerciseHrs.slice(0, exerciseHrs.length-1).map(x => Number(x)),
    target: Number(exerciseHrs.slice(-1))
  }
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (args: number[], target: number) : Result => {

  const average : number = args.reduce((accumulator,  currentValue) => accumulator + currentValue, 0) / args.length

  let rating : number;
  let ratingDescription : string;

  if(average < target/2){
    rating = 1;
    ratingDescription = "Bad, work harder";
  }
  else if(average >= target/2 && average < target){
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }
  else {
    rating = 3;
    ratingDescription = "Excellent, keep it up!!"
  }

  return {
    periodLength: args.length,
    trainingDays: args.filter(x => x !== 0).length,
    success: average >= target ? true : false,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  const { exerciseHrs, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(exerciseHrs, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}