import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {  
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const id = (100000 * Math.random()).toFixed(0)
  const object = {content, id, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (id) => {
  const anecdotes = await getAll()
  const startingAnecdote = anecdotes.find(a => a.id === id)
  const changedAnecdote = {...startingAnecdote, votes: startingAnecdote.votes + 1}
  const anecdote = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
  return anecdote.data
}
export default { getAll, createNew, vote }