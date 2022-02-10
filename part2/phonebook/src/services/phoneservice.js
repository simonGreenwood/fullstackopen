import axios from 'axios'
const baseUrl="/api/persons/"
const createPerson = (person) => {
    return axios.post(baseUrl,person).then(response => response.data)
}
const deletePerson = (position) => {
    return axios.delete(baseUrl + position).then(response => response.data)
}
const editPerson = (position,changedData) => {
    return axios.put(baseUrl + position, changedData).then(response => response.data)
}
const getPersons = () => {
    return axios.get(baseUrl).then(response => response.data)
}
export default {createPerson, deletePerson, getPersons, editPerson}