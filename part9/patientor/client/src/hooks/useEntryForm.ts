import { SelectChangeEvent } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { entryService } from '../services/entries';
import { EntryWithoutId } from '../types';

type CurrentEntry = {
  name: 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';
  value: string;
};

const useEntryForm = (id: string, currentEntry: CurrentEntry) => {
  const formik = useFormik({
    initialValues: {
      description: '',
      date: '',
      specialist: '',
      healthCheckRating: 'Healthy',
      discharge: {
        date: '',
        criteria: '',
      },
      employerName: '',
      sickLeave: {
        startDate: '',
        endDate: '',
      },
    },
    onSubmit: async (object, { resetForm }) => {
      switch (currentEntry.name) {
        case 'HealthCheck': {
          const newEntry = {
            ...object,
            type: 'HealthCheck',
            diagnosisCodes,
          };

          entryService.create(newEntry as EntryWithoutId, id);
          break;
        }
        case 'Hospital': {
          const newEntry = {
            ...object,
            type: 'Hospital',
            diagnosisCodes,
          };

          entryService.create(newEntry as EntryWithoutId, id);
          break;
        }
        case 'OccupationalHealthcare': {
          const newEntry = {
            ...object,
            type: 'OccupationalHealthcare',
            diagnosisCodes,
          };

          entryService.create(newEntry as EntryWithoutId, id);
          break;
        }
        default:
          throw new Error('Something is wrong');
      }

      resetForm();
    },
  });

  const [diagnosisCode, setDiagnosisCode] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const handleChangeDiagnosis = (e: SelectChangeEvent<string>) => {
    setDiagnosisCode(e.target.value);
  };

  const handleAddDiagnosis = () => {
    if (diagnosisCodes.includes(diagnosisCode)) {
      alert('Cant add the same code twice!');
      return;
    }
    setDiagnosisCodes([...diagnosisCodes, diagnosisCode]);
  };

  return {
    formik,
    diagnosisCode,
    diagnosisCodes,
    handleChangeDiagnosis,
    handleAddDiagnosis,
    setDiagnosisCodes,
  };
};

export default useEntryForm;
