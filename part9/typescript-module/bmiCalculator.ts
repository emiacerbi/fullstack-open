const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100
  const squareOfHeight = heightInMeters * heightInMeters
  const bmi = weight / squareOfHeight

  if (process.argv.length > 4) throw new Error('Please type only two inputs')

  if (bmi < 16) return 'Underweight (Severe thinness)'
  if (bmi < 16.9) return 'Underweight (Moderate thinness)'
  if (bmi < 18.4) return 'Underweight (Mild thinness)'
  if (bmi < 24.9) return 'Normal range'
  if (bmi < 29.9) return 'Overweight (Pre-obese)'
  if (bmi < 34.9) return 'Obese (Class I)'
  if (bmi < 39.9) return 'Obese (Class II)'
  if (bmi >= 40) return 'Obese (Class III)'

  throw new Error(
    'One of your arguments is incorrect, please try again with only numbers'
  )
}

const height = Number(process.argv[2])
const weight = Number(process.argv[3])

try {
  console.log(calculateBmi(height, weight))
} catch (error) {
  let errorMessage = 'Something went wrong: '

  if (error instanceof Error) {
    errorMessage += error.message
  }

  console.log(errorMessage)
}
