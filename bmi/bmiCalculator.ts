interface BmiValues {
  height: number;
  weight: number;
}

const parseBMIArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number) : string => {
  const bmi = weight / ((height/100) ** 2)
  if(bmi < 25){
    return 'Normal'
  }
  else if(bmi >= 30){
    return 'Obese'
  }
  else {
    return 'Overweight'
  }
}

try {
  const { height, weight } = parseBMIArguments(process.argv);
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}