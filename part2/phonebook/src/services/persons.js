import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => axios.get(baseUrl).then(response => response.data)

const addPerson = person => axios.post(baseUrl, person).then(response => response.data)

const deletePerson = personId => axios.delete(`${baseUrl}/${personId}`)

export default { getPersons, addPerson, deletePerson }