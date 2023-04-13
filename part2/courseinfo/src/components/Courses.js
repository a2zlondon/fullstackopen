const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
    const initialValue = 0;
    return (
        <div>
            <span>total of </span>
            {
                parts.reduce(function (accumulator, currentValue) {
                    return accumulator + currentValue.exercises
                }, initialValue)
            }
            <span> exercises</span>
        </div>
    )
}

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
            <Total parts={course.parts} />
        </div>
    )
}

const Courses = ({ courses }) => {
    return (
        <div>
            {
                courses.map(course =>
                    <Course course={course} />
                )
            }
        </div>
    )
}

export default Courses