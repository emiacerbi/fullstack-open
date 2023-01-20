const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.json())

app.use(cors())

// const morgan = require('morgan')

// morgan.token('body', (req, res) => JSON.stringify(req.body))

// app.use(
//   morgan(
//     ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
//   )
// )

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => response.json(persons))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({
      error: 'One or more inputs are missing',
    })
  }

  const person = new Person({
    name,
    number,
  })

  person
    .save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const { name, number } = request.body

  if (!number) {
    return response.status(400).json({
      error: 'Number required',
    })
  }

  Person.findByIdAndUpdate(
    id,
    {
      name,
      number,
    },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.get('/info', (request, response) => {
  const date = new Date()
  const message = `<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`

  response.send(message)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response
      .status(400)
      .send({ error: 'Please use a valid number (1234-4321)' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
