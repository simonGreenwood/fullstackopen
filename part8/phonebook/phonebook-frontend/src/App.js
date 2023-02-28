import { useApolloClient, useQuery } from "@apollo/client"
import { useState } from "react"

import { ALL_PERSONS } from "./queries"

import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import PhoneForm from "./components/PhoneForm"
import LoginForm from "./components/LoginForm"
const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

    
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage}/>
        <LoginForm 
          setToken={setToken}
          setError={notify}
        />
      </>
    )
  }
  if (result.loading) {
    return <div>loading....</div>
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>
}
export default App
