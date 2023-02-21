import patients from '../../data/patients';
import { NoSSNPatient, Patient } from '../types';

const getEntries = (): Patient[] => {
  return patients;
};

const getNoSSNEntries = (): NoSSNPatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default {
  getEntries,
  getNoSSNEntries
};