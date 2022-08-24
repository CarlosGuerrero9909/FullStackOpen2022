import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = ({statistic, text}) => (
  <tr>
    <td>{text}</td>
    <td>{statistic} </td>
  </tr>
)

const Statistics = (props) => {
  const {_good, _neutral, _bad, _all, _average, _positive} = props

  if (_all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <Statistic statistic={_good} text='Good'/>
      <Statistic statistic={_neutral} text='Neutral'/>
      <Statistic statistic={_bad} text='Bad'/>
      <Statistic statistic={_all} text='All'/>
      <Statistic statistic={_average} text='Average'/>
      <Statistic statistic={_positive} text='Positive'/>
    </div>
)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad 
  const average = ((good - bad) / all).toFixed(1)
  const positive = ((good*100) / all).toFixed(1) + ' %'

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)


  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGood} text='Good'/>
      <Button onClick={handleNeutral} text='Neutral'/>
      <Button onClick={handleBad} text='Bad'/>
      <h1>Statistics</h1>
      <Statistics 
        _good={good} _neutral={neutral} _bad={bad}
        _all={all} _average={average} _positive={positive}
      />
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
