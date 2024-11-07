import './SearchPage.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { apiClient } from '../api/api';
import BookCard from '../components/BookCard';

function SearchPage() {
    const [books, setBooks] = useState([]);
    const location = useLocation();
    const searchTerm = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await apiClient.get(`/google/search`, { params: { query: searchTerm } });
                setBooks([...response.data.booksFromDatabase, ...response.data.booksFromGoogle]);
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
            {books.length > 0 ? (
                <div className="card-list">
                    {books.map((bookInList) => (
                        <BookCard key={bookInList.isbn} book={bookInList} />
                    ))}
                </div>
            ) : (
                <p>No books found for this search!</p>
            )}
        </div>
    );
}

export default SearchPage;
