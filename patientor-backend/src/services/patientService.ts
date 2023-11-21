import patientsData from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatientEntry, EntryWithoutId, Entry } from '../types';
import { v1 as uuid } from 'uuid';

let patients: Patient[] = patientsData;

const getPatientEntries = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getAPatientEntry = (patientId: string): Patient | Record<string, never> => {
  const patientFound = patients.find(x => x.id === patientId);
  if(patientFound){
    return patientFound;
  } else {
    return {};
  }
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = ( entry: EntryWithoutId, patientId: string ): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  
  patients = patients.map(patient =>
    {
    if(patient.id === patientId){
      patient.entries.push(newEntry)
    }
      return patient
  })
  return newEntry;
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  addPatient,
  getAPatientEntry,
  addEntry
};