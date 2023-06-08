import { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import PhoneBookList from './components/PhoneBookList'
import { useEffect } from 'react'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState({ type: null, message: null })

  if (!persons) return null


  useEffect(() => {
    phonebookService.getAllPersons().then(data => {
      setPersons([...data])
    })

  }, [])


  // the event will be sent automatically
  const addPersonToPhonebook = (event) => {
    event.preventDefault() // to prevent default form submit which refrehses the page

    let isName = false
    let tempPerson;
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.toLowerCase() === newName.toLowerCase()) {
        isName = true;
        tempPerson = { ...persons[i], name: newName, number: newNumber };
        break;
      }
    }

    if (!isName) {

      phonebookService.creatNewPerson({ name: newName, number: newNumber }).then(data => {
        setPersons(persons.concat(data))
        setErrorMessage({ ...errorMessage, type: 'success', message: `Added ${data.name}` })
        setTimeout(() => {
          setErrorMessage({ ...errorMessage, type: null, message: null })
        }, 3000)
      })
    } else {
      if (window.confirm(`${tempPerson.name} is already added to the Phonebook, replace the old number with a new one?`)) {
        phonebookService.updatePerson(tempPerson.id, tempPerson).then(response => {
          setPersons(persons.map(p => {
            return p.id === response.data.id ? response.data : p
          }))
        }).catch(err => {
          setErrorMessage({ ...errorMessage, type: 'error', message: `Information of ${tempPerson.name} has already been removed from server` })
          setTimeout(() => {
            setErrorMessage({ ...errorMessage, type: null, message: null })
          }, 3000)
          setPersons(persons.filter(person => person.id !== tempPerson.id))
        })
      }
    }
  }

  const deletePersonFromPhonebook = (id) => {
    if (window.confirm("Do you really want to delete?"))
      phonebookService.deletePerson(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
        alert(`Person with id: ${id}, is no more . . . . . in the database`)
      }).catch(err => {
        const person = persons.filter(person => person.id === id)
        setErrorMessage({ ...errorMessage, type: 'error', message: `Information of ${person.name} has already been removed from server` })
        setTimeout(() => {
          setErrorMessage({ ...errorMessage, type: null, message: null })
        }, 3000)
        setPersons(persons.filter(person => person.id !== id))
      })
  }


  const handleSearchInputChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personFilter = newFilter ? persons.filter(person => {
    return person.name.toLowerCase().includes(newFilter.toLowerCase())
  }) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} />
      <div>
        Filter Shown With: <Filter componentState={newFilter} handleChange={handleSearchInputChange} />
      </div>
      <h2>Phonebook</h2>
      <Form componentState={{ name: newName, number: newNumber }}
        handleChange={{ name: handleNameInputChange, number: handleNumberInputChange }}
        handleSubmit={addPersonToPhonebook} />
      <h2>Numbers</h2>
      <PhoneBookList personList={personFilter} handleDeletePerson={deletePersonFromPhonebook} />
      <div>debug: {newName} {newNumber}</div>
    </div>
  )
}

export default App