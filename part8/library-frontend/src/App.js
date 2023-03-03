import { useEffect, useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)

  useEffect(() => {})

  return (
    <div>
      <Navbar setPage={setPage} token={token} setToken={setToken} />

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Login show={page === "login"} setToken={setToken} />
    </div>
  )
}

export default App
