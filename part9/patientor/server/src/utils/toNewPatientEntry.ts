import {
  Diagnosis,
  Discharge,
  Gender,
  HealthCheckRating,
  NewEntryWithoutId,
  NewPatientEntry,
} from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

const isHealthCheckRating = (
  healthCheckRating: number
): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating as number)) {
    throw new Error(
      'Incorrect or missing healthCheckRating: ' + healthCheckRating
    );
  }

  return healthCheckRating as number;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (
  discharge: unknown
): { date: string; criteria: string } => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }

  if ('date' in discharge && 'criteria' in discharge) {
    return discharge as Discharge;
  } else {
    throw new Error('Missing date or criteria');
  }
};

export const toNewEntry = (entry: unknown): NewEntryWithoutId => {
  if (!entry || typeof entry !== 'object') {
    throw new Error('Cant submit an empty entry');
  }

  if (
    'type' in entry &&
    'description' in entry &&
    'date' in entry &&
    'specialist' in entry &&
    'diagnosisCodes' in entry
  ) {
    switch (entry.type) {
      case 'HealthCheck': {
        if ('healthCheckRating' in entry) {
          const newEntry: NewEntryWithoutId = {
            type: 'HealthCheck',
            description: parseDescription(entry.description),
            date: parseDate(entry.date),
            specialist: parseName(entry.specialist),
            healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
          };

          if (entry.diagnosisCodes) {
            newEntry.diagnosisCodes = parseDiagnosisCodes(entry);
          }

          return newEntry;
        }

        throw new Error('Missing healthheck rating in ' + entry.type);
      }

      case 'OccupationalHealthcare': {
        if ('employerName' in entry) {
          const newEntry: NewEntryWithoutId = {
            type: 'OccupationalHealthcare',
            description: parseDescription(entry.description),
            date: parseDate(entry.date),
            specialist: parseName(entry.specialist),
            employerName: parseName(entry.employerName),
          };

          if (entry.diagnosisCodes) {
            newEntry.diagnosisCodes = parseDiagnosisCodes(entry);
          }

          return newEntry;
        }

        throw new Error('Missing employer name in ' + entry.type);
      }

      case 'Hospital': {
        if ('discharge' in entry) {
          const newEntry: NewEntryWithoutId = {
            type: 'Hospital',
            description: parseDescription(entry.description),
            date: parseDate(entry.date),
            specialist: parseName(entry.specialist),
            discharge: parseDischarge(entry.discharge),
          };

          if (entry.diagnosisCodes) {
            newEntry.diagnosisCodes = parseDiagnosisCodes(entry);
          }

          return newEntry;
        }

        throw new Error('Missing discharge in ' + entry.type);
      }

      default:
        throw new Error('Wrong type in new entry');
    }
  }

  throw new Error('Something is wrong with new entry');
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'gender' in object &&
    'occupation' in object &&
    'ssn' in object &&
    'entries' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSSN(object.ssn),
      entries: [],
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};
