interface ExerciseValues {
  hrs: number[];
  target: number;
}

export const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  for(const x of args.slice(2)){
    if(isNaN(Number(x))){
      throw new Error('Provided values were not numbers!');
    }
  }

  const target = Number(args[2]);
  const exerciseHrs: string[] = args.slice(3);

  return {
    hrs: exerciseHrs.map(x => Number(x)),
    target
  };
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number
}

export const calculateExercises = (hrs: number[], target: number) : Result => {
  const average: number = hrs.reduce((accumulator, initialValue) => accumulator + initialValue, 0) / hrs.length;

  let rating: number;
  let ratingDescription: string;

  if(average < target/2){
    rating = 1;
    ratingDescription = 'bad';
  }
  else if(average < target){
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }
  else{
    rating = 3;
    ratingDescription = 'excellent, keep it up';
  }

  return {
    periodLength: hrs.length,
    trainingDays: hrs.filter(x => x !== 0).length,
    success: average >= target ? true : false,
    rating,
    ratingDescription,
    target,
    average
  };
};