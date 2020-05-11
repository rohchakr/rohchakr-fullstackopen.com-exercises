import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => <h1>{course}</h1>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => (
  parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises} />)
)

const Total = ({parts}) => (
  <p>
    Number of exercises {
      // parts[0].exercises + parts[1].exercises + parts[2].exercises + parts[3].exercises
      parts.map(p => p.exercises).reduce((acc, curr) => acc + curr)
    }
  </p>
)

const Course = ({ course }) => (
  <div>
  <Header course={course.name} />
  <Content parts={course.parts} />
  <Total parts={course.parts} />
  </div>
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
      <Course course={course} />
  )
}

ReactDOM.render(<App />, document.getElementById('root'))