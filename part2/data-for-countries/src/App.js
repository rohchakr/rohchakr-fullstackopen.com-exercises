import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) => (
  <div>
        Find countries <input value={value} onChange={onChange} />
  </div>
)

const Countries = ({ data, filterString }) => {
  const TOO_MANY_MATCHES_WARNING = `Too many matches, specify another filter`
  const INITIAL_FILTER_INFORMATION = `Enter filter for country names above to get matching countries' data`
  const NO_MATCHES_WARNING = `No matches found, specify another filter`
  let content = ''

  if (filterString === '') {
    content = INITIAL_FILTER_INFORMATION
  } else if (data.length > 10) {
    content = TOO_MANY_MATCHES_WARNING
  } else if (data.length === 0) {
    content = NO_MATCHES_WARNING
  } else if (data.length === 1) {
    content = <SingleCountry country={data[0]} />
  } else {
    content = data.map(c => <Country key={c.name} name={c.name} />)
  }

  return (
    <div>
    {content}
    </div>
  )
}

const Country = ({ name }) => (
  <div>{name}</div>
)

const SingleCountry = ({ country }) => (
  <div>
    <h2>{country.name}</h2>
    <div>Capital: {country.capital}</div>
    <div>Population: {country.population}</div>
    <h3>Languages</h3>
    <ul>
      {(country.languages).map( lang => <li key={lang.name}>{lang.name}</li> )}
    </ul>
    <img src={country.flag} width='100 px' alt='' />
  </div>
)
 
const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const  [ filteredCountries, setFilteredCountries ] = useState([])
  const [ filterName, setFilterName ] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterNameChange = (event) => {
    const newNameFilter = event.target.value
    setFilterName(newNameFilter)
    setFilteredCountries(countries.filter(
      c => c.name.toLowerCase().includes(newNameFilter.toLowerCase())
    ))
  }

  return (
    <div>
      <Filter value={filterName} onChange={handleFilterNameChange} />
      <Countries data={filteredCountries} filterString={filterName} />
    </div>
  )
}

export default App