import { useState } from 'react'
import { useEffect } from 'react'
import Search from './components/Search'
import countriesService from './services/countries'
import Countries from './components/Countries'
import CountryDetails from './components/CountryDetails'

function App() {

  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleShowCountryDetails = (name) => {
    console.log('%cApp.js line:24 name', 'color: #007acc;', name);
    setCountry(countries.find((p) => p.name.common === name))
    console.log('%cApp.js line:26 country', 'color: #007acc;', country);
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setCountry(null)
    setNewSearch(event.target.value)
  }

  let showDetail;
  if (country) {
    console.log('%cApp.js line:34 showDetails? country', 'color: #007acc;', country);
    showDetail = <div><CountryDetails country={country} /></div> 
  } else {
    console.log('%cApp.js line:38 showDetails ', 'color: #007acc;', country );
    showDetail = <div><Countries countries={countries} newSearch={newSearch} showCountryDetails={handleShowCountryDetails} /></div>
  }

  return (
    <div>
      <div>
        <Search search={newSearch} changeHandler={handleSearchChange}  />
      </div>
      {showDetail}
    </div>
 
  )
}

export default App;