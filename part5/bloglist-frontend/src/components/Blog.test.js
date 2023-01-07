import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'test author',
  id: '6396d2bb7a41fe556f526ae4',
  likes: 9,
  url: 'localhost:3003',
  user: {
    username: 'root',
    name: 'root',
    id: '638c710325b48c62927de329',
  },
}
const userForBlog = {
  user: {
    username: 'root',
    name: 'root',
    id: '638c710325b48c62927de329',
  },
}

test('renders content', async () => {
  const { container } = render(<Blog startingBlog={blog} user={userForBlog} />)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library test author'
  )
})

test('url and likes are displayed after button click', async () => {
  const { container } = render(<Blog startingBlog={blog} user={userForBlog} />)
  const div = container.querySelector('.blog')
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  expect(div).not.toHaveStyle('display: none')

  const url = container.querySelector('.url')
  expect(url).toHaveTextContent(blog.url)

  const likes = container.querySelector('.likes')
  expect(likes).toHaveTextContent(`likes: ${blog.likes}`)
})

test('event handler is called twice when like button is clicked twice', async () => {
  const mockHandler = jest.fn()
  render(
    <Blog startingBlog={blog} user={userForBlog} handleLike={mockHandler} />
  )
  const viewButton = screen.getByText('view')
  const user = userEvent.setup()
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
test('event handler is called with the right props', async () => {
  const handleLike = jest.fn()
  render(
    <Blog startingBlog={blog} user={userForBlog} handleLike={handleLike} />
  )
  const viewButton = screen.getByText('view')
  const user = userEvent.setup()
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  expect(handleLike.mock.calls).toHaveLength(1)
  expect(handleLike.mock.calls[0][0] === blog).toBe(true)
})
