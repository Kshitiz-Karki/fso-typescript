import express from 'express';
import patientService from '../services/patientService';
import {toNewPatientEntry, toNewEntry} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  const reqPayload = req.body;
  reqPayload.patientId = req.params.id;
  
  try {
    const newEntry = toNewEntry(reqPayload);
    const addedEntry = patientService.addEntry(newEntry, reqPayload.patientId);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const patientId: string = req.params.id;
  res.send(patientService.getAPatientEntry(patientId));
});

export default router;