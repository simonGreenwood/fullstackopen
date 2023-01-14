import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material'
const User = () => {
  const id = useParams().id
  const user = useSelector((state) => state.users.find((u) => u.id === id))
  if (!user) return null
  return (
    <div>
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="h5">added blogs</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {user.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default User
