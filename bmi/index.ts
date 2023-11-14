import express from 'express';
import { parseBmiArguments, calculateBmi } from './calculateBmi';
import { calculateExercises } from './calculateExercises';
import { onlyNumbers } from './utils';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log(req.query);
  const queryParams:{ height: string, weight: string }|object = req.query;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { height, weight } = parseBmiArguments(Object.values(queryParams));
    res.send({
      weight,
      height,
      bmi: calculateBmi(height, weight)
    });
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    res.status(400).send({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  
  if(!daily_exercises || !target){
    return res.status(400).send({ error: "parameters missing" });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
  if(isNaN(Number(target)) || daily_exercises.length === 0 || !onlyNumbers(daily_exercises)){
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const result = calculateExercises(daily_exercises as number[], Number(target));
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});