import { useQuery, useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, CHANGE_BIRTHYEAR } from "../queries"
const Authors = (props) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")

  const authors = useQuery(ALL_AUTHORS)
  const [changeBirthyear] = useMutation(CHANGE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const handleBirthyearSubmit = (event) => {
    event.preventDefault()
    console.log(name, born)
    changeBirthyear({
      variables: {
        name,
        born: Number(born),
      },
    })
    setName("")
    setBorn("")
  }
  if (!props.show) {
    return null
  }
  if (authors.loading) {
    return <h1>Loading...</h1>
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={(e) => handleBirthyearSubmit(e)}>
        <h3>Set birthyear</h3>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button action="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
