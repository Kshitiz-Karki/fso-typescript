import { parseBmiArguments, calculateBmi } from "./calculateBmi";

try {
  const { height, weight } = parseBmiArguments(process.argv.slice(2));
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
