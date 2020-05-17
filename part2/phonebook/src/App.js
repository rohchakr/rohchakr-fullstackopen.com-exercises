import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) => (
  <div>
        filter by name <input value={value} onChange={onChange} />
  </div>
)

const PersonForm = ( props ) => (
  <form onSubmit={props.onSubmit}>
    <div>
      name: <input value={props.name} onChange={props.onNameChange} />
    </div>
    <div>
      number: <input value={props.number} onChange={props.onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ data }) => (
  <>
  {data.map(p => <Person key={p.name} name={p.name} number={p.number} />)}
  </>
)

const Person = ({ name, number }) => (
  <div>{name} {number}</div>
)
 
const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const  [ filteredPersons, setFilteredPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const NAME_EXISTS_WARNING = `${newName} is already added to phonebook`

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(p => p.name).includes(newName)) {
      alert(NAME_EXISTS_WARNING)
    } else {
      setPersons(persons.concat( {name: newName, number: newNumber} ))
      // reset filters
      setFilterName('')
      setFilteredPersons(persons.concat( {name: newName, number: newNumber} ))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    const newNameFilter = event.target.value
    setFilterName(newNameFilter)
    setFilteredPersons(persons.filter(
      p => p.name.toLowerCase().includes(newNameFilter.toLowerCase())
    ))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={handleFilterNameChange} />
      <h3>Add New</h3>
      <PersonForm 
        onSubmit={addPerson} 
        name={newName} 
        number={newNumber} 
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      /> 
      <h3>Numbers</h3>
      <Persons data={filteredPersons} />
    </div>
  )
}

export default App