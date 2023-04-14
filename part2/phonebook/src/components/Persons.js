import Person from './Person'

const Persons = ({ persons , newFilter }) => {
    return (
    <ul>
        {persons.filter(person => person.name.toLowerCase().match(newFilter)).map(person =>
            <Person key={person.id} person={person} />
        )}
        </ul>
    )
}

export default Persons
