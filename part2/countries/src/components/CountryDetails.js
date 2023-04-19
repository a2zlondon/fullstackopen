import { useEffect } from 'react'
import { useState } from 'react'
import weatherService from '../services/weather'

const CountryDetails = ({ country, api_key }) => {

    const [weather, setWeather] = useState({})

    useEffect(() => {
        weatherService
            .getByCapital(country.capital, api_key)
            .then(w => {
                setWeather(w.current)
            })
    }, [])

    const lang = []
    for (const [key, value] of Object.entries(country.languages)) {
        lang.push(value)
    }

    return (
        <div>
            <h3>{country.name.common}</h3>
            <div>capital {country.capital} </div>
            <div>area {country.area}</div> 
            <h3>languages</h3>
            <ul>
                {
                    lang.map((language) => {
                        return (<li key={language}>{language}</li>)
                    })
                }
            </ul>
            <img src={country.flags.png} height='100' alt={`flag of ${country.flag}`} />  
            <h2>Weather in {country.capital} </h2>
            

            <div>temperature {weather.temp_c} Celsius</div>

            <img src={`https:${weather.condition?.icon}`} height='100' alt={`weather image of ${country.capital}`} />
            
            <div>wind {weather.wind_mph} mph</div>

        </div>
    )
}

export default CountryDetails