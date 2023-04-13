import { useState } from 'react'
import Person from './components/Person'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
      console.log(nameObject)
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log('yeah serCH Bby', event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
         <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>       
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => person.name.toLowerCase().match(newFilter)).map(person  => 
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App