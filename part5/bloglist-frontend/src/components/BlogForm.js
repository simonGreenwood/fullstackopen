import { useState } from 'react'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
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
      <h2>create new</h2>
      <form>
        <div>
          title:
          <input
            type="text"
            value={title}
            id="title"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            id="author"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            id="url"
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" onClick={(event) => handleCreateBlog(event)}>
          create
        </button>
      </form>
    </div>
  )
}
export default BlogForm
