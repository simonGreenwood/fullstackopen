import { useState } from 'react'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { TextField, Button, Typography } from '@mui/material'
const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    console.log(blogObject)
    try {
      const returnedBlog = await blogService.createBlog(blogObject)
      console.log('created blog')
      dispatch(addBlog(returnedBlog))
      dispatch(
        setNotification(
          `new blog ${returnedBlog.title} by ${returnedBlog.author}`,
          5
        )
      )
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      console.log('invalid content')
      dispatch(setNotification('invalid content', 5))
    }
  }

  return (
    <div>
      <Typography variant="h4">Create a new blog</Typography>
      <form onSubmit={(event) => handleCreateBlog(event)}>
        <div>
          <TextField
            label="title"
            type="text"
            value={title}
            id="title"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label="author"
            type="text"
            value={author}
            id="author"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            label="url"
            type="text"
            value={url}
            id="url"
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button id="create-button" type="submit" variant="contained">
          create
        </Button>
      </form>
    </div>
  )
}
export default BlogForm
