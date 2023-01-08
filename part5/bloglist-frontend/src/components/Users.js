import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Users = () => {
  const users = useSelector((state) => state.users)
  // use selector to get all the users and sort them based on the amount of blogs.
  console.log(users)
  if (users === []) return <h1>Loading...</h1>
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Users
