import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS } from "../queries"
const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: filter ? { genre: filter } : {},
  })
  useEffect(() => {
    if (result.loading) return
    result.data.allBooks.map((book) =>
      book.genres.map((genre) => {
        if (!genres.includes(genre)) setGenres(genres.concat(genre))
      })
    )
  }, [result, genres])
  useEffect(() => {
    result.refetch({ genre: filter })
  }, [filter, result])
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <h1>Loading...</h1>
  }
  return (
    <div>
      <h2>books</h2>
      {filter ? (
        <p>
          in genre <strong>{filter}</strong>
        </p>
      ) : (
        <></>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks
            .filter((book) => (filter ? book.genres.includes(filter) : true))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setFilter(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
