import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test author',
  }

  const { container } = render(<Blog startingBlog={blog} />)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library test author')
})