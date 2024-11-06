import './BookModal.css';

function BookModal({ book, onClose, onAddToLibrary, onAddToFavorites, onLeaveReview }) {
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

            {/* Scrollable Description Box */}
            <div className="book-description">
              "{book.description || 'No description available.'}"
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button onClick={onAddToFavorites}>Add to Favorites</button>
              <button onClick={onAddToLibrary}>Add to Bookshelf</button>
              <button onClick={onLeaveReview}>Leave a Review</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookModal;
