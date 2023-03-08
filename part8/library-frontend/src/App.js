import { useEffect, useState } from "react"

import { useSubscription } from "@apollo/client"
import { BOOK_ADDED, ALL_BOOKS } from "./queries"

import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Recommended from "./components/Recommended"

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
  console.log(query)
  cache.updateQuery(query, ({ allBooks }) => {
    console.log(allBooks)
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const newBook = data.data.bookAdded
      window.alert(`${newBook.title} added!`)
      updateCache(client.cache, { query: ALL_BOOKS }, newBook)
    },
  })

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
