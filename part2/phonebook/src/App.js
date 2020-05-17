import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const  [ filteredPersons, setFilteredPersons ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const NAME_EXISTS_WARNING = `${newName} is already added to phonebook`

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(p => p.name).includes(newName)) {
      alert(NAME_EXISTS_WARNING)
    } else {
      setPersons(persons.concat( {name: newName, number: newNumber} ))
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
      <div>
        filter by name <input value={filterName} onChange={handleFilterNameChange} />
      </div>
      <h2>Add New</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(p => <div key={p.name}>{p.name} {p.number}</div>)}
    </div>
  )
}

export default App