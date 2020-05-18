import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

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
    personsService
      .getPersons()
      .then(d => {
        setPersons(d)
        setFilteredPersons(d)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(p => p.name).includes(newName)) {
      alert(NAME_EXISTS_WARNING)
    } else {
      const newPerson = {name: newName, number: newNumber}
      personsService
        .addPerson(newPerson)
        .then(d => {
          setPersons(persons.concat(d))
          // reset filter
          setFilterName('')
          setFilteredPersons(persons.concat(d))
        })
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