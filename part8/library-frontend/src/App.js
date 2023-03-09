import { useEffect, useState } from "react"

import { useSubscription } from "@apollo/client"
import { ALL_BOOKS, BOOK_ADDED } from "./queries"

import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Recommended from "./components/Recommended"

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
    console.log(allBooks, addedBook)
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
      cache.updateQuery({ query: ALL_BOOKS }, (r) => {
        console.log(r)
      })
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
