import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS, ME } from "../queries"
const Recommended = ({ show }) => {
  const [favourite, setFavourite] = useState("")
  const meResult = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS, {
    variables: { genre: favourite },
  })

  useEffect(() => {
    if (meResult.loading) return
    setFavourite(meResult.data.me.favouriteGenre)
    booksResult.refetch()
  }, [meResult])

  if (!show) return
  if (booksResult.loading || meResult.loading) return <h1>Loading...</h1>
  return (
    <div>
      <h2>recommendations</h2>
      books in your favourite genre <strong>{favourite}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksResult.data.allBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Recommended
