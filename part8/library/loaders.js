const DataLoader = require("dataloader")
const Book = require("./models/Book")
const Author = require("./models/Author")
const bookCountLoader = new DataLoader(async (authorIds) => {
  const authors = await Author.find({ _id: { $in: authorIds } })
  const books = await Book.find({ author: { $in: authorIds } })

  return authors.map((author) => {
    return books.filter(
      (book) => book.author.toString() === author._id.toString()
    ).length
  })
})

module.exports = { bookCountLoader }
