import { useEffect, useState } from "react"

import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Recommended from "./components/Recommended"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("library-user-token")
    if (!storedToken) return
    setToken(storedToken)
  }, []) //eslint-disable-line

  return (
    <div>
      <Navbar setPage={setPage} token={token} setToken={setToken} />
      <Authors show={page === "authors"} token={token} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommended show={page === "recommended"} />
      <Login show={page === "login"} setToken={setToken} />
    </div>
  )
}

export default App
