import { useState } from 'react';
import AddToBookshelfModal from './AddToBookshelfModal';
import './BookModal.css';
import ReviewFormModal from './ReviewFormModal';
import ShowReviewModal from './ShowReviewModal'; 



function BookModal({ book, onClose, onAddToFavorites, onLeaveReview }) {
  const [showAddToBookshelfModal, setShowAddToBookshelfModal] = useState(false);
  const [showReviewFormModal, setShowReviewFormModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
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
              <button onClick={() => setShowReviewFormModal(true)}>Leave a Review</button> 
              <button onClick={() => setShowReviewsModal(true)}>Show Reviews</button>
            </div>
          </div>
        </div>
      </div>

      {showAddToBookshelfModal && (
        <AddToBookshelfModal
          book={book} 
          onClose={() => setShowAddToBookshelfModal(false)} 
        />
      )}
        {showReviewFormModal && (  // Conditionally render ReviewFormModal
        <ReviewFormModal
          bookId={book.bookId}
          onClose={() => setShowReviewFormModal(false)}
        />
      )}

      {showReviewsModal && ( // Render ShowReviewModal
                <ShowReviewModal
                    bookId={book.bookId}
                    onClose={() => setShowReviewsModal(false)} 
                />
            )}
    </div>
  );
}

export default BookModal;
