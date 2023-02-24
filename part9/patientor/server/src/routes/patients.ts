import express from 'express';
import patientService from '../services/patients';
import { toNewPatientEntry } from '../utils/toNewPatientEntry';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNoSSNEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong: ';

    if (error instanceof Error) {
      errorMessage += error.message;
    }

    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

export default router;
