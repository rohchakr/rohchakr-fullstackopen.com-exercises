import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => <h1>{course}</h1>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => (
  parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises} />)
)

const Total = ({parts}) => (
  <p>
  <strong>  
    Total of {
      // parts[0].exercises + parts[1].exercises + parts[2].exercises + parts[3].exercises
      parts.map(p => p.exercises).reduce((acc, curr) => acc + curr)
    } exercises
  </strong>
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
  
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
      courses.map( course => <Course key={course.id} course={course} />)
  )
}

ReactDOM.render(<App />, document.getElementById('root'))