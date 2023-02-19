import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
import bp from 'body-parser';

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/bmi', (req, res) => {
  try {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    const result = calculateBmi(height, weight);
    res.send(result);
  } catch (error) {
    let errorMessage = 'malformatted parameters: ';

    if (error instanceof Error) {
      errorMessage += error.message;
    }

    res.json({ error: errorMessage });
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    const result = calculateExercise(
      daily_exercises as number[],
      target as number
    );

    res.send(result);
  } catch (error) {
    let errorMessage = 'malformatted parameters: ';

    if (error instanceof Error) {
      errorMessage += error.message;
    }

    res.json({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
