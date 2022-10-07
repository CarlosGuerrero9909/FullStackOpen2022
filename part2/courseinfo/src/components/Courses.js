import React from 'react'

const Header = ({ courseName }) => <h2>{courseName}</h2>

const Total = ({ _sum }) => <p><strong>Total of {_sum} exercises</strong></p>

const Part = ({ partName, partExercises }) => ( 
  <p>
    {partName} {partExercises}
  </p>
)

const Content = ({ _parts }) => ( 
  <>
    {_parts.map(
      part => (
        <Part key={part.id} partName={part.name} partExercises={part.exercises} /> 
      )
    )}
  </>
)

const Course = ({ name, parts }) => {
  const sum = parts.reduce((acum, part) => acum + part.exercises, 0)

  return (
    <>
      <Header courseName={name}/>
      <Content _parts={parts}/>
      <Total _sum={sum}/>
    </>
  )
}

const Courses = ({ _courses }) => (
  <>
    {_courses.map(
      course => (
        <Course key={course.id} name={course.name} parts={course.parts} />
      )
    )}
  </>
)

export default Courses


