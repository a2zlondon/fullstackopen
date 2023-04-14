import { useState } from 'react'
import { useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  function ifNameExists(nom) {
    return nom.name === newName;
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(ifNameExists)) {
        alert(`${newName} is already added to phonebook`)
    } else { 
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
      })

      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter filter={newFilter} changeHandler={handleFilterChange}  />
      </div>
      <h2>Add a new</h2>
    
      <PersonForm onSubmitClick={addName} newName={newName} nameChange={handleNameChange} newNumber={newNumber} numberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons persons={persons} newFilter={newFilter} />
      
    </div>
  )
}

export default App