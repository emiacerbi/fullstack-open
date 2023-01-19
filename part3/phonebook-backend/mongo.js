const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.ifzul0z.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

mongoose.set('strictQuery', false)

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')

    if (process.argv.length < 4) {
      return Person.find({}).then((result) => {
        console.log(`phonebook: ${result}`)
      })
    }

    if (process.argv.length === 4) {
      return console.log('please provide a name and a number')
    }

    if (process.argv.length === 5) {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      })

      console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`)

      return person.save()
    }
  })
  .then(() => {
    console.log('disconnected')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
