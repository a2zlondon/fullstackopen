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
    const p = persons.find(ifNameExists)
    if (p) {
      console.log(`So I can see it ${p.id}`)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) { 
        const nameObject = {
          name: newName,
          number: newNumber,
          id: p.id,
        }
        personService
        .update(p.id, nameObject)
          .then(
            personService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)})
        )
        setNewName('')
        setNewNumber('')
      }
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

  const handleDeletePerson = (id) => {
    console.log(`Delete person with ID ${id}`)
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person.id)
        .then((person) => {
          console.log(`Deleted`)
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          console.log(error);
          alert(`there was an error deleting person '${person.name}'`)
        });
    }
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

      <Persons persons={persons} newFilter={newFilter} deletePerson={handleDeletePerson} />
      
    </div>
  )
}

export default App