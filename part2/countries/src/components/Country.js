const Country = ({ country }) => {
    console.log(`COUNTRY = ${country.name.official}`)
    return (
        <div>
            <div key={country.key}>{country.name.official} </div>
        </div>
    )
}

export default Country