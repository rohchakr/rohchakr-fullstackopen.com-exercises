import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

const TIMEOUT_FREQ = 5000 // 5 sec 

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

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

const Persons = ({ data, handleDeletePerson }) => (
  <>
  {data.map(p => <Person key={p.name} name={p.name} number={p.number} deletePerson={handleDeletePerson} />)}
  </>
)

const Person = ({ name, number, deletePerson }) => (
  <div>{name} {number} <button name={name} onClick={deletePerson}>Delete</button></div>
)
 
const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const  [ filteredPersons, setFilteredPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ notificationType, setNotificationType ] = useState('default')
  const UPDATE_NUMBER_WARNING = `${newName} is already added to phonebook, replace the old number with a new one?`

  useEffect(() => {
    personsService
      .getPersons()
      .then(d => {
        setPersons(d)
        setFilteredPersons(d)
      })
  }, [])

  const addPerson = (event) => {
    const ADD_PERSON_MSG = `Added ${newName}`
    event.preventDefault()

    if (persons.map(p => p.name).includes(newName)) {
      if(window.confirm(UPDATE_NUMBER_WARNING)) {
        updatePerson()
      }
    } else {
      const newPerson = {name: newName, number: newNumber}
      personsService
        .addPerson(newPerson)
        .then(d => {
          setPersons(persons.concat(d))
          // reset filter
          setFilterName('')
          setFilteredPersons(persons.concat(d))
          setNewName('')
          setNewNumber('')
          setMessage(ADD_PERSON_MSG)
          setNotificationType('default')
          setTimeout(() => {setMessage(null)}, TIMEOUT_FREQ)
        })
    }
  }

  const updatePerson = () => {
    const person = persons.filter(p => p.name === newName)[0]
    const pId = person.id
    const personData = { ...person, number : newNumber }
    const UPDATE_PERSON_MSG = `Updated number of ${person.name}`
    const ERROR_PERSON_MSG = `Information of ${person.name} might have been removed from the server`

    personsService
      .updatePerson(pId, personData)
      .then(d => {
        const insertPosition = persons.findIndex(p => p.id === pId)
        const updatedPersons = persons.slice(0,insertPosition).concat(d).concat(persons.slice(insertPosition + 1))
        setPersons(updatedPersons)
        // reset filter
        setFilterName('')
        setFilteredPersons(updatedPersons)
        setNewName('')
        setNewNumber('')
        setMessage(UPDATE_PERSON_MSG)
        setNotificationType('default')
        setTimeout(() => {setMessage(null)}, TIMEOUT_FREQ)
      })
      .catch(error => {
        setMessage(ERROR_PERSON_MSG)
        setNotificationType('error')
        setTimeout(() => {setMessage(null)}, TIMEOUT_FREQ)
      })
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

  const handleDeletePerson = (event) => {
    const personName = event.target.name
    const DELETE_WARNING = `Delete ${personName} ?`
    const DELETE_PERSON_MSG = `Deleted ${personName}`
    const ERROR_PERSON_MSG = `Information of ${personName} might have been removed from the server`

    if (window.confirm(DELETE_WARNING)) {
      personsService
        .deletePerson(persons.filter(p => p.name === personName)[0].id)
        .then(() => {
          setPersons(persons.filter(p => p.name !== personName))
          setFilteredPersons(filteredPersons.filter(p => p.name !== personName))
          setMessage(DELETE_PERSON_MSG)
          setNotificationType('default')
          setTimeout(() => {setMessage(null)}, TIMEOUT_FREQ)
        })
        .catch(error => {
          setMessage(ERROR_PERSON_MSG)
          setNotificationType('error')
          setTimeout(() => {setMessage(null)}, TIMEOUT_FREQ)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={notificationType} />
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
      <Persons data={filteredPersons} handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App