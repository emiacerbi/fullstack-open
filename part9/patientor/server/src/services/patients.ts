import patients from '../../data/patients';
import {
  Entry,
  EntryWithoutId,
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from '../types';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): Patient[] => {
  return patients;
};

const getNoSSNEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    ...entry,
    id: uuidv4(),
  };

  patients.push(newPatient);

  return newPatient;
};

const addEntry = (patient: Patient, entry: EntryWithoutId): Entry => {
  const newEntry = {
    ...entry,
    id: uuidv4(),
  };

  patient.entries = patient.entries.concat(newEntry);

  return newEntry;
};

export default {
  getEntries,
  getNoSSNEntries,
  addPatient,
  findById,
  addEntry,
};
