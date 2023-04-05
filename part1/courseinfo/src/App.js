const Header = (props) => {
  return (
      <h1>
      {props.coursename}
      </h1>
  )
}

const Part = (props) => { 
   return ( 
    <p>
      {props.part} {props.exercise}
     </p>
   )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
      <p>
      Number of exercises {props.total}
      </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const partsandexercises = [
    { name: 'Fundamentals of React', exercises: '10' },
    { name: 'Using props to pass data', exercises: '7' },
    { name: 'State of a component', exercises: '14' },
  ]

  return (
    <div>
      <Header coursename={ course } />
      <Content parts={ partsandexercises } /> 
      <Total total={parseInt(partsandexercises[0].exercises) + parseInt(partsandexercises[1].exercises)  + parseInt(partsandexercises[2].exercises) }/>
    </div>
  )
}

export default App