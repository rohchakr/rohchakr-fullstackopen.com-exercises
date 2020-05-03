import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistic = ({text, value}) => {
  // extra % char at the end for positive
  if (text === 'positive') {
    return <p>{text} {value} %</p>
  }
  
  return <p>{text} {value}</p>
}

const Statistics = ({good, neutral, bad}) => {
  const scores = {
    good: 1, 
    neutral: 0, 
    bad: -1
  }
  const all = good + neutral + bad
  const avg = (good*scores.good + neutral*scores.neutral + bad*scores.bad) / all
  const positive = good*100 / all

  if (all === 0) {
    return (
      <>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
    <h1>statistics</h1>
    <Statistic text='good' value={good} />
    <Statistic text='neutral' value={neutral} />
    <Statistic text='bad' value={bad} />
    <Statistic text='all' value={all} />
    <Statistic text='avg' value={avg} />
    <Statistic text='positive' value={positive} />
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)