import './SearchPage.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { apiClient } from '../api/api';

function SearchPage() {
    const [books, setBooks] = useState([]);
    const [databaseBooks, setDatabaseBooks] = useState([]);
    const location = useLocation();
    const searchTerm = new URLSearchParams(location.search).get('query'); // Get the search term from the URL

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await apiClient.get(`/google/search`, { params: { query: searchTerm } });
                // Assuming the API response structure
                setDatabaseBooks(response.data.booksFromDatabase); // Save database books
                setBooks(response.data.booksFromGoogle); // Save Google books
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        if (searchTerm) {
            fetchBooks();
        }
    }, [searchTerm]);

    return (
        <div className="search-page">
            <h1>Search Results for "{searchTerm}"</h1>
            {books.length > 0 || databaseBooks.length > 0 ? (
                <div className="card-list">
                    {books.map((bookInList) => (
                        <div className="card" key={bookInList.isbn}>
                            <img src={bookInList.image} alt={bookInList.title} />
                            <p>Title: {bookInList.title}</p>
                            <p>Description: {bookInList.description}</p>
                            <p>ISBN: {bookInList.isbn}</p>
                        </div>
                    ))}
                    {databaseBooks.map((bookInList) => (
                        <div className="card" key={bookInList.isbn}>
                            <img src={bookInList.image} alt={bookInList.title} />
                            <p>Title: {bookInList.title}</p>
                            <p>Description: {bookInList.description}</p>
                            <p>ISBN: {bookInList.isbn}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No books found for this search!</p>
            )}
        </div>
    );
}

export default SearchPage;
