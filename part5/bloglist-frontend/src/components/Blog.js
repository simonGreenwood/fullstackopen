import { Link } from 'react-router-dom'
import { TableRow, TableCell } from '@mui/material'
const Blog = ({ blog }) => {
  return (
    <TableRow className="blog">
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </TableCell>
      <TableCell align="right">{blog.author}</TableCell>
    </TableRow>
  )
}

export default Blog
