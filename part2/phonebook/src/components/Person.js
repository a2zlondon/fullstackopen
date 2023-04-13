const Person = ({ person }) => {
    return (
        <li key={person.key}>{person.name} {person.number}</li>
    )
}

export default Person