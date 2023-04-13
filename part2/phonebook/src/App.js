import { useState } from 'react'
import Name from './components/Name'



const App = () => {
  const [names, setNames] = useState([
    { fullname: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    console.log(newName)
    event.preventDefault()
    const nameObject = {
      fullname: newName,
      id: names.length + 1,
    }
    setNames(names.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {names.map(name => 
          <Name key={name.fullname} name={name.fullname} />
        )}
      </ul>
    </div>
  )
}

export default App