import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
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
const updateBlog = async (id,blogObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, blogObject)
  return request.data
}
export default { setToken, createBlog, getAll, updateBlog }