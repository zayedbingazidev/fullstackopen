const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.static('dist'))
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
morgan.token('dontretreivedatalikethis', (req, res) => req.method === "POST" ? JSON.stringify(req.body): "No data to be retrieved. The question asks only for POST Request")
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :dontretreivedatalikethis'))

let persons  = [
      { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get('/', (req, res) => {
      res.send('<h1>Hello World</h1>')
})

app.get('/info', (req, res) => {
      res.send(`<p>Phonebook has info for ${persons.length} people</p>
            <p>${(new Date(Date.now())).toUTCString()}</p>
      `).end()
})

app.get('/api/persons', (req, res) => {
      res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
      const id = Number(req.params.id)
      const person = persons.find(p => p.id === id)

      if (person) res.json(person)
      else {
            res.status(404).end()
      }
})

app.delete('/api/persons/:id', (req, res) => {
      persons = persons.filter((person) => person.id !== Number(req.params.id))

      res.status(204).end()
})

app.post('/api/persons', (req, res) => {

      if(!req.body.name || !req.body.number) return res.status(400).json({
            error: 'content missing'
      })
      
      if(persons.map(p=> p.name).includes(req.body.name)) return res.status(400).json({
            error: 'name must be unique'
      })
      const id = Math.floor(Math.random()*100000000)
      const body = req.body
      const newPerson = {
            id: id,
            name: body.name,
            number: body.number
      }

      persons = persons.concat(newPerson)
      res.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
      console.log(`Server running at Port: ${PORT}. http://localhost:${PORT}`);
})