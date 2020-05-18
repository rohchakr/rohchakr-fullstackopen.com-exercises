import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) => (
  <div>
        Find countries <input value={value} onChange={onChange} />
  </div>
)

const Countries = ({ data, filterString, expandCountry, weather }) => {
  const TOO_MANY_MATCHES_WARNING = `Too many matches, specify another filter`
  const INITIAL_FILTER_INFORMATION = `Enter filter for country names above to get matching countries' data`
  const NO_MATCHES_WARNING = `No matches found, specify another filter`
  let content = ''

  if (filterString === '' && data.length !== 1) {
    content = INITIAL_FILTER_INFORMATION
  } else if (data.length > 10) {
    content = TOO_MANY_MATCHES_WARNING
  } else if (data.length === 0) {
    content = NO_MATCHES_WARNING
  } else if (data.length === 1) {
    content = <SingleCountry country={data[0]} weather={weather} />
  } else {
    content = data.map(c => <Country key={c.name} name={c.name} expand={expandCountry} />)
  }

  return (
    <div>
    {content}
    </div>
  )
}

const Country = ({ name, expand }) => (
  <div>{name} <button name={name} onClick={expand}>show</button></div>
)

const SingleCountry = ({ country, weather }) => (
  <div>
    <h2>{country.name}</h2>
    <div>Capital: {country.capital}</div>
    <div>Population: {country.population}</div>
    <h3>Languages</h3>
    <ul>
      {(country.languages).map( lang => <li key={lang.name}>{lang.name}</li> )}
    </ul>
    <img src={country.flag} width='100 px' alt='' />
    <h3>Weather in {country.capital}</h3>
    <Weather weather={weather} />
  </div>
)

const Weather = ({ weather }) => (
  <div>
     <div><strong>Temperature:</strong> {weather.temp}</div>
     <img src={weather.imgUrl} alt={weather.desc} />
     <div><strong>Wind:</strong> {weather.wind}</div>
  </div>
)
 
const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const  [ filteredCountries, setFilteredCountries ] = useState([])
  const [ filterName, setFilterName ] = useState('')
  const [ capitalCity, setCapitalCity ] = useState('')
  const [ weather, setWeather ] = useState({})
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const API_KEY = process.env.REACT_APP_WEATHERSTACK_API_KEY
  const WEATHERSTACK_BASE_URL = 'http://api.weatherstack.com/'
  const current_weather_endpoint = `${WEATHERSTACK_BASE_URL}current?access_key=${API_KEY}&query=${capitalCity}`

  useEffect(() => {
    if (capitalCity === '') return
    axios
      .get(current_weather_endpoint)
      .then(response => {
        const data = response.data
        const res = {
          temp: `${data.current.temperature}° celcius`,
          wind: `${data.current.wind_speed} mph direction ${data.current.wind_dir}`,
          imgUrl: data.current.weather_icons[0],
          desc: data.current.weather_descriptions[0]
        }
        setWeather(res)
      })
  }, [capitalCity, current_weather_endpoint])

  const handleFilterNameChange = (event) => {
    const newNameFilter = event.target.value
    const countriesFilter = countries.filter(
      c => c.name.toLowerCase().includes(newNameFilter.toLowerCase())
    )
    setFilterName(newNameFilter)
    setFilteredCountries(countriesFilter)
    if (countriesFilter.length === 1) {
      setCapitalCity(countriesFilter[0].capital)
    }
  }

  const showSingleCountry = (event) => {
    setCapitalCity(filteredCountries.filter(c => c.name === event.target.name)[0].capital)
    setFilteredCountries(filteredCountries.filter(c => c.name === event.target.name))
  }

  return (
    <div>
      <Filter value={filterName} onChange={handleFilterNameChange} />
      <Countries data={filteredCountries} filterString={filterName} expandCountry={showSingleCountry} weather={weather} />
    </div>
  )
}

export default App