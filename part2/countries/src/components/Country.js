const Country = ({ country, showCountry }) => {
    console.log(`COUNTRY = ${country.name.official}`)
    return (
        <div>
            <div key={country.key}>{country.name.official} <button onClick={showCountry}>show</button></div>
        </div>
    )
}

export default Country