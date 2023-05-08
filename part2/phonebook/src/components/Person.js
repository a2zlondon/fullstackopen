/* eslint-disable react/prop-types */
const Person = ({ person, deletePerson }) => {
  return (
    <div>
      <li key={person.key}>{person.name} {person.number}
        <button onClick={deletePerson}>delete</button>
      </li>
    </div>
  )
}

export default Person