import Country from './Country'
import CountryDetails from './CountryDetails'

const Countries = ({ countries, newSearch }) => {
    const filteredCountries = countries.filter(country => country.name.official.toLowerCase().match(newSearch))   
    console.log('%ccountries.js line:6 filteredCountries.length', 'color: #007acc;', filteredCountries.length);
    if (filteredCountries.length === 1) {
        return (
            <CountryDetails country={filteredCountries[0]} />
        )
    } else if (filteredCountries.length < 10) {
        return (
        <div>
            {filteredCountries.map(country => <Country key={country.name.common} country={country} />)}
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
