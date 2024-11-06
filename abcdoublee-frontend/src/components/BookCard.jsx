import { useState } from 'react';
import BookModal from './BookModal';
import './BookCard.css';

function BookCard({ book }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="book-card" onClick={openModal}>
            <img src={book.image} alt={`${book.title} cover`} className="book-image" />
            <div className="book-info">
                <h3>{book.title}</h3>
                <p><strong>Authors:</strong> {book.authors?.join(', ') || 'N/A'}</p> {/* Display list of authors */}
                <p><strong>Genres:</strong> {book.genres?.join(', ') || 'N/A'}</p>   {/* Display list of genres */}
            </div>

            {isModalOpen && (
                <BookModal
                    book={book}
                    onClose={closeModal}
                    onAddToLibrary={() => {
                        console.log(`Adding ${book.title} to library`);
                    }}
                />
            )}
        </div>
    );
}

export default BookCard;
