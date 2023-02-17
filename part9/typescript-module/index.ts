import express from 'express'
import { calculateBmi } from './bmiCalculator'
const app = express()

app.get('/ping', (_req, res) => {
  res.send('pong')
})

app.get('/bmi', (req, res) => {
  try {
    const weight = Number(req.query.weight)
    const height = Number(req.query.height)
    const result = calculateBmi(height, weight)
    res.send(result)
  } catch (error) {
    let errorMessage = 'malformatted parameters: '

    if (error instanceof Error) {
      errorMessage += error.message
    }

    res.json({ error: errorMessage })
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
