import { useState } from 'react'
import Name from './components/Name'

const addName = (event) => {
  event.preventDefault()
  const nameObject = {
    content: newName,
    id: notes.length + 1,
  }
  setName(names.concat(nameObject))
  setNewName('')
}

const App = (props) => {
  const [names, setNames] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App