import './BrowsePage.css';
import { useEffect, useState } from 'react';
import { apiClient } from '../api/api';
import BookCard from '../components/BookCard';
function BrowsePage() {

    const [books, setBooks] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
          try {
            // Confirming token in Authorization header
            console.log("Authorization header:", apiClient.defaults.headers.common['Authorization']);

            const response = await apiClient.get('/Book'); // Make sure endpoint matches backend
            console.log(response);
            setBooks(response.data);
          } catch (error) {
            console.error('Error fetching books:', error);
          }
        };
        fetchBooks();
      }, []);

  return (
    <div className="browse-page">
      <h1>Browse all books in our database</h1>
      <p>*note: These aren't our only books, these are just the books that any user has already added to their own library*</p>
    
      {books != null ? (
          <div className="card-list">
            {books.map((bookInList) => (
              <BookCard key={bookInList.isbn} book={bookInList} />
            ))}
          </div>
        ) : (
          <p>No Books in our Database!</p>
        )}
    </div>
  );

}

export default BrowsePage;