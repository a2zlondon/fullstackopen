import { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [names, setNames] = useState([
    { fullname: 'Arto Hellas',  number: '09798 123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  function ifNameExists(nom) {
    return nom.fullname === newName;
  }

  const addName = (event) => {
    event.preventDefault()
    if (names.find(ifNameExists)) {
        alert(`${newName} is already added to phonebook`)
    } else { 
      const nameObject = {
        fullname: newName,
        number: newNumber,
        id: names.length + 1,
      }
      setNames(names.concat(nameObject))
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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {names.map(name => 
          <Name key={name.fullname} name={name} />
        )}
      </ul>
    </div>
  )
}

export default App