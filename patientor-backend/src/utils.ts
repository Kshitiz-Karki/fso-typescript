import { NewPatientEntry, Gender, EntryWithoutId, Diagnosis, HealthCheckRating, BaseEntryWithoutId } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};


export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object)  {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
      entries: []
    };
    return newEntry;
  }
  throw new Error('Incorrect data: a field missing');
};

///////////////////////////////////////////////////////////////////////////////
const parseEntryType = (type: unknown): 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' => {
  if (type !== 'HealthCheck' && type !== 'Hospital' && type !== 'OccupationalHealthcare') {
    throw new Error('Incorrect or missing type');
  }
  return type;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect Healthcheck rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

interface Discharge {
  date: string;
  criteria: string;
}

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== 'object' || !('date' in discharge) || !('criteria' in discharge)
  || !isString(discharge.criteria) || !isString(discharge.date) ) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge as Discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

interface SickLeave {
  startDate: string;
  endDate: string;
}

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object' || !('startDate' in sickLeave) || !('endDate' in sickLeave)
  || !isString(sickLeave.endDate) || !isString(sickLeave.startDate) ) {
    throw new Error('Incorrect or missing sickLeave');
  }
  return sickLeave as SickLeave;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if('type' in object && parseEntryType(object.type)){
    const type = parseEntryType(object.type);

    let baseEntry: BaseEntryWithoutId;
    if('description' in object && 'date' in object && 'specialist' in object && 'patientId' in object){
      baseEntry = {
        date: parseDate(object.date),
        description: parseDescription(object.description),
        specialist: parseSpecialist(object.specialist),
      };
      if('diagnosisCodes' in object){
        baseEntry.diagnosisCodes = parseDiagnosisCodes(object)
      }
      let newEntry: EntryWithoutId;
      if('healthCheckRating' in object && type === 'HealthCheck'){
        newEntry = { ...baseEntry, type,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
        }
        return newEntry;
      }
      if(type === 'OccupationalHealthcare' && 'employerName' in object){
        newEntry = { ...baseEntry, type,
          employerName: parseEmployerName(object.employerName)
        }
        if('sickLeave' in object){
          newEntry.sickLeave = parseSickLeave(object.sickLeave)
        }
        return newEntry;
      }
      if('discharge' in object && type === 'Hospital'){
        newEntry = { ...baseEntry, type,
          discharge: parseDischarge(object.discharge)
        }
        return newEntry;
      }
    } 
  }
  throw new Error('Incorrect data: a field missing');
};