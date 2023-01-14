import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import LoginForm from './components/LoginForm'
import Users from './components/Users'
import Home from './components/Home'
import User from './components/User'
import BlogPage from './components/BlogPage'
import Navbar from './components/Navbar'

import { Container } from '@mui/material'
const App = () => {
  const { blogs, user } = useSelector((state) => state)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(initializeUser())
  }, [])

  if (blogs === []) return <h1>Loading..</h1>
  if (user === null) return <LoginForm />
  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/blogs/:id" element={<BlogPage />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Container>
  )
}

export default App
