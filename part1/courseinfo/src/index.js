import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.part1} exercises={props.exercises1}/>
      <Part part={props.part2} exercises={props.exercises2}/>
      <Part part={props.part3} exercises={props.exercises3}/>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
}

const App = () => {
  const _course = 'Half Stack application development'
  const _part1 = 'Fundamentals of React'
  const _exercises1 = 10
  const _part2 = 'Using props to pass data'
  const _exercises2 = 7
  const _part3 = 'State of a component'
  const _exercises3 = 14

  return (
    <div>
      <Header course={_course}/>
      <Content part1={_part1} exercises1={_exercises1} 
              part2={_part2} exercises2={_exercises2}
              part3={_part3} exercises3={_exercises3}
      />
      <Total total={_exercises1 + _exercises2 + _exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
