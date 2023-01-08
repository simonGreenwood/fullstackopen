import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog: (state, action) => {
      state.push(action.payload)
      return state
    },
    setBlogs: (state, action) => {
      return action.payload
    },
    deleteBlog: (state, action) => {
      const newBlogs = state.filter((blog) => blog.id !== action.payload)
      return newBlogs
    },
    updateBlogs: (state, action) => {
      const id = action.payload.id
      const changedBlog = action.payload
      state = state.map((blog) => (blog.id === id ? changedBlog : blog))
      return state
    },
  },
})

export const { appendBlog, setBlogs, deleteBlog, updateBlogs } =
  blogsSlice.actions

export const addBlog = (blog) => {
  return async (dispatch) => {
    dispatch(appendBlog(blog))
  }
}
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const removeBlog = (blog) => {
  return async (dispatch) => {
    const id = blog.id
    console.log(blog, blog.id)
    await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}
export const likeBlog = (blog) => {
  return async (dispatch) => {
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    await blogService.updateBlog(blog.id, changedBlog)
    dispatch(updateBlogs(changedBlog))
  }
}
export const commentOnBlog = (blog, comment) => {
  return async (dispatch) => {
    const changedBlog = {
      ...blog,
      comments: blog.comments.concat(comment),
    }
    await blogService.createComment(blog.id, comment)
    dispatch(updateBlogs(changedBlog))
  }
}
export default blogsSlice.reducer
