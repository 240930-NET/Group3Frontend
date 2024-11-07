import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/api';

function AddToBookshelfModal({ book, onClose }) {
    const [bookshelves, setBookshelves] = useState([]);
    const [selectedBookshelf, setSelectedBookshelf] = useState(null);
    const [error, setError] = useState(null);

    // Fetch the user's bookshelves when the modal opens
    useEffect(() => {
        const fetchBookshelves = async () => {
            try {
                const response = await apiClient.get('/Library/bookshelves');
                
                setBookshelves(response.data);
            } catch (error) {
                console.error('Error fetching bookshelves:', error);
                setError('Failed to fetch bookshelves.');
            }
        };

        fetchBookshelves();
    }, []);

    const handleAddToBookshelf = async () => {
        if (!selectedBookshelf) {
            setError('Please select a bookshelf.');
            return;
        }
        try {
            await apiClient.post(`/Bookshelf/${selectedBookshelf}/addBook`, book);
            alert('Book added to bookshelf!');
            onClose(); // Close modal after adding
        } catch (error) {
            console.error('Error adding book to bookshelf:', error);
            setError('Failed to add book to bookshelf.');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Select Bookshelf for "{book.title}"</h2>
                
                {error && <p className="error">{error}</p>}
                
                {/* Dropdown for selecting a bookshelf */}
                <select
                    value={selectedBookshelf || ''}
                    onChange={(e) => setSelectedBookshelf(e.target.value)}
                >
                    <option value="">Select a Bookshelf</option>
                    {bookshelves.map((shelf) => (
                        <option key={shelf.bookshelfId} value={shelf.bookshelfId}>
                            {shelf.name}
                        </option>
                    ))}
                </select>
                
                <button onClick={handleAddToBookshelf}>Add to Bookshelf</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default AddToBookshelfModal;
