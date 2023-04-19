const CountryDetails = ({ country }) => {
    console.log('%cCountryDetails.js line:4 COUNTRY: country', 'color: #007acc;', country);
    const lang = []
    for (const [key, value] of Object.entries(country.languages)) {
        console.log(`key value ${key}: ${value}`)
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
        </div>
    )
}

export default CountryDetails