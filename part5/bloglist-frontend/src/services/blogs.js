import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const createBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(baseUrl, blogObject, config)
  return request.data
}
const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}
const updateBlog = async (id, blogObject) => {
  console.log(id, blogObject.comments)
  const request = await axios.put(`${baseUrl}/${id}`, blogObject)
  return request.data
}
const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.status
}
const createComment = async (id, comment) => {
  const data = { comment }
  const request = await axios.post(`${baseUrl}/${id}/comments`, data)
  return request.status
}
export default {
  setToken,
  createBlog,
  getAll,
  updateBlog,
  deleteBlog,
  createComment,
}
