const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <li>
    {part.name} {part.exercises}
  </li>

const Content = ({ parts }) => {
  return (
    <div>
      <ul>
          {
            parts.map(part =>
              <Part key={part.id} part={part} />
            )
          }
        </ul>
      </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'State of a component II',
        exercises: 16,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
