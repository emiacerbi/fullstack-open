import express from 'express';
import data from '../../data/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(data);
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;