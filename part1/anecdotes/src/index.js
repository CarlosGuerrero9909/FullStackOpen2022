import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const Anecdote = ({anecdote, numVotes}) => (
  <>
    <p>{anecdote}</p>
    <p>Has {numVotes} votes</p>
  </>
)


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [allVotes, setAllVotes] = useState([0, 0, 0, 0, 0, 0]) //each pos represents a anecdote

  const posMostVoted = allVotes.indexOf(Math.max(...allVotes)) 

  const handleSelected = () => setSelected(
    Math.floor(Math.random() * props.anecdotes.length)
  )

  const handleAllVotes = () => {
    const copyAllVotes = [...allVotes]
    copyAllVotes[selected] += 1
    setAllVotes(copyAllVotes) 
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={props.anecdotes[selected]} numVotes={allVotes[selected]}/>
      <Button onClick={handleAllVotes} text="Vote"/>
      <Button onClick={handleSelected} text="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={props.anecdotes[posMostVoted]} numVotes={allVotes[posMostVoted]}/>
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
