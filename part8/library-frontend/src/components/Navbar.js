import { useApolloClient } from "@apollo/client"

const Navbar = ({ token, setToken, setPage }) => {
  const client = useApolloClient()
  const logout = () => {
    console.log("logout")
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  return (
    <div>
      <button onClick={() => setPage("authors")}>authors</button>
      <button onClick={() => setPage("books")}>books</button>
      {token ? (
        <>
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => setPage("recommended")}>recommended</button>
          <button onClick={() => logout()}>logout</button>
        </>
      ) : (
        <button onClick={() => setPage("login")}>login</button>
      )}
    </div>
  )
}
export default Navbar
