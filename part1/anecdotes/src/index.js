import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({heading, text, votes}) => (
  <>
  <h1>{heading}</h1>
  <p>{text}<br />has {votes} votes<br /></p>
  </>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState({})
  const [mostVoted, setMostVoted] = useState(0)

  const getRandomInt = (max) => (Math.floor(Math.random() * Math.floor(max)))
  const getVote = (index) => {
    if (vote[index] === undefined) {
      vote[index] = 0
    }
    return vote[index]
  }
  const incrementVote = () => () => {
    // console.log(vote[selected])
    setVote({...vote, [selected]: vote[selected] + 1})
    // console.log(vote[selected])
    // at this point vote[selected] is still not incremented, both console.log fetche the same value
    if (vote[selected] + 1 > vote[mostVoted]) {
      setMostVoted(selected)
    }
  }

  return (
    <div>
      <Anecdote heading='Anecdote of the day' text={props.anecdotes[selected]} votes={getVote(selected)} />
      <Button onClick={incrementVote()} text='vote' />
      <Button onClick={() => setSelected(getRandomInt(props.anecdotes.length))} text='next anecdote' />
      <Anecdote heading='Anecdote with most votes' text={props.anecdotes[mostVoted]} votes={getVote(mostVoted)} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)