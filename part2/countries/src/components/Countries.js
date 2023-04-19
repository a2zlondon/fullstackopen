import Country from './Country'

const Countries = ({ countries, newSearch }) => {
    const filteredCountries = countries.filter(country => country.name.official.toLowerCase().match(newSearch))   

    if (filteredCountries.length === 1) {
        console.log(`filteredCountries${filteredCountries[0].flag}`)

        console.log(`LEN ${filteredCountries[0].length}`)
        const lang = []
        for (const [key, value] of Object.entries(filteredCountries[0].languages)) {
            console.log(`key value ${key}: ${value}`)
            lang.push(value)
        }

        return (
            <div>
                <h3>{filteredCountries[0].name.common}</h3>
                <div>capital {filteredCountries[0].capital} </div>
                <div>area {filteredCountries[0].area}</div> 
                <h3>languages</h3>
                <ul>
                {
                    lang.map((language) => {
                        return (<li>{language}</li>)
                    })
                }
                </ul>
                <img src={filteredCountries[0].flags.png} height='100' alt={`flag of ${filteredCountries[0].flag}`} />  
            </div>
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
