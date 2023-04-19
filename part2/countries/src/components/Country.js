const Country = ({ country, showCountryDetails }) => {
    return (
        <div>
            <div key={country.key}>{country.name.official} <button onClick={showCountryDetails}>show</button></div>
        </div>
    )
}

export default Country