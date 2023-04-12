import { useState } from 'react'

const Header = (props) => {
  return (
      <h1>
      {props.title}
      </h1>
  )
}

const Button = ({ onClick, btnText }) => { 
  console.log(onClick)
  return(
    <button onClick={onClick}>
      {btnText}
    </button>
  )
}

function handleVote(votesArr, id) {
  let copyVotes = [...votesArr]
  copyVotes[id] += 1
  return copyVotes
}

const Result = (props) => {
  return (
      <p>
      {props.result}
      </p>
  )
}

const App = () => {

  const title = 'Anecdote of the day'
  const titleResult = 'Anecdote with the most votes'
    const anecdotes = [
      'If it hurts, do it more often.',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      'The only way to go fast, is to go well.'
    ]
   
  const [selected, setSelected] = useState(0);
  const initialArray = Array(anecdotes.length).fill(0);
  const [votes, setVote] = useState(initialArray);

  return (
    
    <div>
      <Header title={title} />
      {anecdotes[selected]}
      <div>
        has { votes[selected]} votes
      </div>
      <div>
        <Button onClick = {() => setVote(handleVote(votes, selected))} btnText="vote"  />
        <Button onClick = {() => setSelected(Math.floor(Math.random() * anecdotes.length)) } btnText="next anecdote" />
      </div>
      <Header title={titleResult} />
      <Result result = {anecdotes[votes.indexOf(Math.max(...votes))]} />
    </div>

  )
}

export default App
