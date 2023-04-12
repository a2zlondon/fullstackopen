import { useState } from 'react'

const Header = (props) => {
  return (
      <h1>
      {props.title}
      </h1>
  )
}

const Statistics = (props) => {
  
  const all = props.good + props.neutral + props.bad
  //const average = [good, neutral, bad].reduce((x,y) => x+y)/[good, neutral, bad].length
  //const average = good/all + (bad/all)*-1
  const average = props.good/all - props.bad/all
  const positive = (props.good/all)*100

  return (
      <div>
        <h1>
        statistics
        </h1>
        <table>
          <tr>
            <td>good</td><td>{props.good}</td>
          </tr>
          <tr>
            <td>neutral</td><td>{props.neutral}</td>
          </tr>
          <tr>
            <td>bad</td><td>{props.bad}</td>
          </tr>
          <tr>
            <td>all</td><td>{all}</td>
          </tr>
          <tr>
            <td>average</td><td>{isNaN(average) ? 0 : average }</td>
          </tr>
          <tr>
            <td>positive</td><td>{isNaN(positive) ? 0 : positive }%</td>
          </tr>
        </table>
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

      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App