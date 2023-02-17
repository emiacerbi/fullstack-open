export const calculateExercise = (array: number[], target: number) => {
  if (isNaN(target)) throw new Error('Target must be a number')

  array.forEach((element) => {
    if (isNaN(element)) {
      throw new Error('Array must have all numbers')
    }
  })

  const periodLength = array.length
  const trainingDays = array.reduce((acc, el) => {
    if (el > 0) acc += 1
    return acc
  }, 0)

  const totalHoursNeeded = array.length * target
  const totalHoursTrained = array.reduce((acc, el) => (acc += el))
  const success = totalHoursTrained >= totalHoursNeeded

  const rating =
    totalHoursTrained < totalHoursNeeded / 2
      ? 1
      : totalHoursTrained < totalHoursNeeded
      ? 2
      : 3

  const ratingDescriptionObj = {
    1: 'could be better',
    2: 'pretty good',
    3: 'perfect score',
  }

  const average = totalHoursTrained / periodLength

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescriptionObj[rating],
    target,
    average,
  }
}

const target = Number(process.argv[2])
const array = [...process.argv].slice(3).map((el) => Number(el))

try {
  console.log(calculateExercise(array, target))
} catch (error) {
  let errorMessage = 'Something went wrong: '

  if (error instanceof Error) {
    errorMessage += error.message
  }

  console.log(errorMessage)
}
