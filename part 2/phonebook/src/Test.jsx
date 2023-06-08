import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [newFilter, setNewFilter] = useState('')

  // the event will be sent automatically


  const addPersonToPhonebook = (event) => {
    event.preventDefault() // to prevent default form submit which refrehses the page
    
    let isName = false
    for (let i = 0; i < persons.length; i++) {
      if(persons[i].name === newName) {
        isName = true;
        break;
      }
    }

    isName ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat({
      name: newName,
      number: newNumber
    }))

  }

  let personsFilter = []
  const handleSearchInputChange = (event) => {
    setNewFilter(event.target.value)
    personsFilter = persons.filter(person => {
      return person.name.toLowerCase().includes(newFilter)
    })

    console.log (personsFilter)
  }

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          Filter Shown With: <input value={newFilter} onChange={handleSearchInputChange} />
      </div>
      <h2>Phonebook</h2>
      <form onSubmit={addPersonToPhonebook}>
        <div>
          Name: <input value={newName} onChange={handleNameInputChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {personsFilter.length > 0 ? personsFilter.map((person, i) => {
        return <p key={i}>{person.name} {person.number}</p>
      }) :persons.map((person, i) => {
        return <p key={i}>{person.name} {person.number}</p>
      })
      }
      <div>debug: {newName} {newNumber}</div>
    </div>
  )
}

export default App