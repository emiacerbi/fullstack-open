const express = require('express')
const app = express()

app.use(express.json())

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
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const id = Math.floor(Math.random() * 10000 + 1)
  const body = request.body
  const newPerson = {
    id,
    name: body.name,
    number: body.number,
  }

  if (!body.name || !body.number) {
    return response.status(400).send({
      error: 'One or more inputs are missing',
    })
  }

  const duplicate = persons.some((person) => person.name === body.name)

  if (duplicate) {
    return response.status(400).send({
      error: 'That user already exists',
    })
  }

  response.send(persons.concat(newPerson))
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)
  response.status(204).end()
})

app.get('/info', (request, response) => {
  const date = new Date()
  const message = `<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`

  response.send(message)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
