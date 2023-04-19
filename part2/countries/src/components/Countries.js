import Country from './Country'
import CountryDetails from './CountryDetails'

const Countries = ({ countries, newSearch, showCountryDetails }) => {

    const filteredCountries = countries.filter(country => country.name.official.toLowerCase().match(newSearch))   
    
    if (filteredCountries.length === 1) {
        return (
            <CountryDetails country={filteredCountries[0]} />
        )
    } else if (filteredCountries.length < 10) {
        return (
        <div>
                {filteredCountries.map(country => <Country key={country.name.common} country={country} showCountryDetails={() => showCountryDetails(country.name.common)} />)}
        </div> 
        )
    } else {
        return (
        <div>
            Too many matches, specify another filter
        </div>
        )
    }
}

export default Countries
