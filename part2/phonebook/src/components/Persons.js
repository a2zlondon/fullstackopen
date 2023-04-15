import Person from './Person'
const Persons = ({ persons , newFilter, deletePerson }) => {
    return (
    <ul>
        {persons.filter(person => person.name.toLowerCase().match(newFilter)).map(person =>
            <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)} />
        )}
        </ul>
    )
}

export default Persons
