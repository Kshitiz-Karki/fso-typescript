import diagnosis from '../../data/diagnoses';

import { Diagnosis } from '../types';

const getDiagnoseEntries = (): Diagnosis[] => {
  return diagnosis;
};

export default {
  getDiagnoseEntries,
};