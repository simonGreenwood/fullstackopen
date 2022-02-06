import React, { useState, useEffect } from 'react'
import AddContact from './components/AddContact'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import Notification from './components/Notification'
import phoneservice from "./services/phoneservice"

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ error, setError ] = useState(null)
  const hook = () => {
    phoneservice.getPersons().then(data => setPersons(data))
  }
  useEffect(hook,[])

  const handleSubmit = (event) => {
    event.preventDefault() 
    if (persons.filter(person => person.name==newName).length==0) {
      const data = {"name":newName, "number":newNumber}
      console.log(data)
      phoneservice.createPerson(data).then(phoneservice.getPersons().then(persons => setPersons(persons)))
      setError(false)
      setNotification(`Added ${newName}`)
      setTimeout(() => setNotification(null), 2000)
      setNewName('')
      setNewNumber('')
    } else {
      if (!window.confirm(`${newName} is already in the phonebook. Replace their phone number?`)) return
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }
      phoneservice
        .editPerson(person._id, changedPerson)
        .then(() => {
          phoneservice.getPersons().then(data => setPersons(data))
          setNewName('')
          setNewNumber('')
          setError(false)
          setNotification(`Edited ${changedPerson.name}'s phone number to ${changedPerson.number}`)
          setTimeout(() => setNotification(null), 2000)
        }).catch(() => {
          setError(true)
          setNotification(`${person.name} has already been removed from the server!`)
          setTimeout(() => setNotification(null), 2000)
        })
      }
  }
  const handleDelete = (person) => {
    if(!window.confirm(`Are you sure you want to delete ${person.name} from the phonebook?`)) return
    phoneservice
    .deletePerson(person._id)
    .catch((error) => {
      setError(true)
      setNotification(`${person.name} has already been removed from the server!`)
      setTimeout(() => setNotification(null), 2000)
    })
    phoneservice.getPersons().then(response => setPersons(response)) 
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} error={error}/>
      <h2>Filter Contacts</h2>
      <Filter 
        value={newFilter} 
        onChange={(event) => setNewFilter(event.target.value)}
      />
      <h2>Add a Contact</h2>
      <AddContact 
        newName={newName} 
        newNumber={newNumber} 
        handleSubmit={handleSubmit} 
        onNumberChange={(event) => setNewNumber(event.target.value)}
        onNameChange={(event) => setNewName(event.target.value)}
      />
      <h2>Numbers</h2>
      <Numbers
        persons={persons}
        activeFilter={newFilter}
        onDelete={(person) => handleDelete(person)}
      />

    </div>
  )
}
export default App