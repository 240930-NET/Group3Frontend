import { useState } from 'react';
import AddToBookshelfModal from './AddToBookshelfModal';
import './BookModal.css';

function BookModal({ book, onClose, onAddToFavorites, onLeaveReview }) {
  const [showAddToBookshelfModal, setShowAddToBookshelfModal] = useState(false);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="book-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>

        <div className="modal-content">
          {/* Left side: Book Image */}
          <div className="book-image-container">
            <img src={book.image} alt={`${book.title} cover`} className="modal-book-image" />
          </div>

          {/* Right side: Book Details */}
          <div className="book-details">
            <h2>{book.title}</h2>
            <p><strong>Author(s):</strong> {book.authors?.join(', ') || 'N/A'}</p>
            <p><strong>Genre(s):</strong> {book.genres?.join(', ') || 'N/A'}</p>

            <div className="book-description">
              "{book.description || 'No description available.'}"
            </div>

            <div className="action-buttons">
              <button onClick={onAddToFavorites}>Add to Favorites</button>
              <button onClick={() => setShowAddToBookshelfModal(true)}>Add to Bookshelf</button>
              <button onClick={onLeaveReview}>Leave a Review</button>
            </div>
          </div>
        </div>
      </div>

      {/* AddToBookshelfModal */}
      {showAddToBookshelfModal && (
        <AddToBookshelfModal
          book={book} // Pass the full book object here
          onClose={() => setShowAddToBookshelfModal(false)} // Close modal after adding
        />
      )}
    </div>
  );
}

export default BookModal;
