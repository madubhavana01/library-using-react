const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
let books = [
  { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien' },
  { id: 2, title: '1984', author: 'George Orwell' }
];
app.get('/', (req, res) => {
  res.send('Welcome to the Book API!');
});
app.get('/books', (req, res) => {
  res.json(books);
});
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(book);
});
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
