import Country from './Country'

const Countries = ({ countries, newSearch }) => {
    const filteredCountries = countries.filter(country => country.name.official.toLowerCase().match(newSearch))    
    if (filteredCountries.length === 1) {
        return (
        <div>SHow single country</div>
        )
    } else if (filteredCountries.length < 10) {
        return (
        <div>
            {filteredCountries.map(country => <Country key={country.name.official} country={country} />)}
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
