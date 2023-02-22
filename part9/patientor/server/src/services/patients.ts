import patients from '../../data/patients';
import { NewPatientEntry, NoSSNPatient, Patient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): Patient[] => {
  return patients;
};

const getNoSSNEntries = (): NoSSNPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    ...entry,
    id: uuidv4(),
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getEntries,
  getNoSSNEntries,
  addPatient,
};
