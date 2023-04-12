import { useState } from 'react'

const Header = (props) => {
  return (
      <h1>
      {props.title}
      </h1>
  )
}

const Button = ({ onClick, btnName }) => { 
  console.log({btnName})
  return(
    <button onClick={onClick}>
      {btnName}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.value} {(props.type === "percentage") && "%"}  </td>
    </tr>
  )
}

const Statistics = (props) => {

  const all = props.good + props.neutral + props.bad
  const average = props.good/all - props.bad/all
  const positive = (props.good / all) * 100

  return (
      <div>
        <h1>
          statistics
        </h1>
        {
          all>0 ?
          <table>
            <tbody>
              <StatisticLine text="good" value={ props.good } />  
              <StatisticLine text="neutral" value={ props.neutral } />
              <StatisticLine text="bad" value={ props.bad } />
              <StatisticLine text="all" value={ all} />
              <StatisticLine text="average" value={isNaN(average) ? 0 : average }/>
              <StatisticLine text="positive" value={isNaN(positive) ? 0 : positive} type="percentage" />
            </tbody>
          </table> : <p>No feedback given</p>
        }
      </div>
    )
}

const App = () => {

  const title = 'give feedback'
  
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title={title} />

      <Button onClick={() => setGood(good + 1)} btnName="good" />
      <Button onClick={() => setNeutral(neutral + 1)} btnName="neutral" />
      <Button onClick={() => setBad(bad + 1)} btnName="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App