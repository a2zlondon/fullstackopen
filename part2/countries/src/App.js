import { useState } from 'react'
import { useEffect } from 'react'
import Search from './components/Search'
import countriesService from './services/countries'
import Countries from './components/Countries'

function App() {

  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])


  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <div>
        <Search search={newSearch} changeHandler={handleSearchChange}  />
      </div>
      <div>
        <Countries countries={countries} newSearch={newSearch}  />
      </div>
    </div>
 
  )
}

export default App;