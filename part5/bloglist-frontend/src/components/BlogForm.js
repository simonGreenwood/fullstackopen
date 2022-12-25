import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({ setErrorMessage, setSuccess, blogs, setBlogs, blogFormRef }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage('created blog')
      setSuccess(true)
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    } catch (exception) {
      console.log('invalid content')
      setErrorMessage('invalid content')
      setSuccess(false)
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form>
        <div>
          title:
          <input
            type='text'
            value={title}
            id='title'
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            id='author'
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            id='url'
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" onClick={(event) => handleCreateBlog(event)}>create</button>
      </form>
    </div>
  )
}
BlogForm.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
}
export default BlogForm