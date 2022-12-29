import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      console.log(action.payload)
      const newAnecdote = action.payload
      return [...state, newAnecdote]
    },
    voteForAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange,
         votes: anecdoteToChange.votes + 1 }
      const newAnecdotes = state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
      return newAnecdotes.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  } 
})
export const { createAnecdote, voteForAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
 
export const createNew = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const vote = (id) => {
  console.log(id, 'vote')
  return async dispatch => {
    await anecdoteService.vote(id)
    dispatch(voteForAnecdote(id))
  }
}


export default anecdoteSlice.reducer