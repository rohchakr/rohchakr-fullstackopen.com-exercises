import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => <h1>{course}</h1>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => (
  parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises} />)
)

// const Total = ({parts}) => (
//   <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
// )

const Course = ({ course }) => (
  <>
  <Header course={course.name} />
  <Content parts={course.parts} />
  </>
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
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
      {/* <Total parts={course.parts} /> */}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))