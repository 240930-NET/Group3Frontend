import { useEffect, useState } from 'react';
import { apiClient } from '../api/api.jsx';
import './BookshelfDropdown.css';

function BookshelfDropdown({ bookId, onAddSuccess }) {
  const [bookshelves, setBookshelves] = useState([]);
  const [selectedBookshelf, setSelectedBookshelf] = useState("");
  const [error, setError] = useState(null);

  // Fetch user’s bookshelves on mount
  useEffect(() => {
    const fetchBookshelves = async () => {
      try {
        const response = await apiClient.get('/library/user/bookshelves');
        setBookshelves(response.data);
      } catch (error) {
        setError("Error fetching bookshelves.");
        console.error(error.response?.data || error.message);
      }
    };

    fetchBookshelves();
  }, []);

  // Handle adding book to selected bookshelf
  const handleAddToBookshelf = async () => {
    if (!selectedBookshelf) return;

    try {
      await apiClient.post(`/library/bookshelf/${selectedBookshelf}/add`, { bookId });
      alert("Book added to bookshelf successfully!");
      onAddSuccess(); // Notify parent component of success
    } catch (error) {
      setError("Failed to add book to bookshelf.");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="bookshelf-dropdown">
      <label htmlFor="bookshelf-select">Select a Bookshelf:</label>
      <select
        id="bookshelf-select"
        value={selectedBookshelf}
        onChange={(e) => setSelectedBookshelf(e.target.value)}
      >
        <option value="" disabled>Select bookshelf...</option>
        {bookshelves.map((shelf) => (
          <option key={shelf.bookshelfId} value={shelf.bookshelfId}>
            {shelf.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddToBookshelf}>Confirm</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default BookshelfDropdown;
