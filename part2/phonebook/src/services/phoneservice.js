import axios from 'axios'
const baseUrl="/api/persons/"
const createPerson = (person) => {
    console.log(`Posting ${JSON.stringify(person)} to ${baseUrl}`)
    return axios.post(baseUrl,person).then(response => response.data)
}
const deletePerson = (position) => {
    return axios.delete(baseUrl + position).then(response => response.data)
}
const editPerson = (position,changedData) => {
    console.log(baseUrl,position)
    return axios.put(baseUrl + position, changedData).then(response => response.data)
}
const getPersons = () => {
    return axios.get(baseUrl).then(response => response.data)
}
export default {createPerson, deletePerson, getPersons, editPerson}