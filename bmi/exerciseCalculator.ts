import { parseExerciseArguments, calculateExercises } from "./calculateExercises";

try {
  const { hrs, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(hrs, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

