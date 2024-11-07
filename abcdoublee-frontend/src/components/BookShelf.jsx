import { useEffect, useState } from 'react';
import { apiClient } from '../api/api.jsx';
import BookCard from './BookCard';
import './Bookshelf.css';

function Bookshelf({ bookshelf, onDelete }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books for the bookshelf
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get(`/bookshelf/${bookshelf.bookshelfId}/books`);
      setBooks(response.data);
    } catch (error) {
      setError("Error fetching books for this bookshelf.");
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [bookshelf.bookshelfId]);

  // Delete bookshelf
  const handleDelete = (e) => {
    onDelete(bookshelf.bookshelfId);
  };

  return (
    <div className="bookshelf">
      <h2>{bookshelf.name}</h2>

      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="books-list">
          {books.length > 0 ? (
            books.map((book) => (
              <BookCard key={book.bookId} book={book} /> // Use BookCard for each book
            ))
          ) : (
            <p>No books in this bookshelf.</p>
          )}
        </div>
      )}

      <button className="deleteButton" onClick={handleDelete}>Delete Bookshelf</button>
    </div>
  );
}

export default Bookshelf;
