import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => axios.get(baseUrl).then(response => response.data)

const addPerson = person => axios.post(baseUrl, person).then(response => response.data)

const deletePerson = personId => axios.delete(`${baseUrl}/${personId}`)

const updatePerson = (personId, personData) => axios.put(`${baseUrl}/${personId}`, personData).then(response => response.data)

export default { getPersons, addPerson, deletePerson, updatePerson }