import { useState, useEffect } from 'react';
import { apiClient } from '../api/api.jsx';
import './ReviewFormModal.css';

function ReviewFormModal({ bookId, onClose }) {
    const [rating, setRating] = useState(-1);
    const [reviewText, setReviewText] = useState('');
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null); // State to hold the userId

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await apiClient.get('/user/userId'); // Fetch user ID
                setUserId(response.data); // Set user ID state
            } catch (error) {
                console.error("Failed to fetch user ID:", error);
                setError("Unable to retrieve user information.");
            }
        };

        fetchUserId();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating < 0) {
            setError('Please select a rating.');
            return;
        }

        try {
            const response = await apiClient.post('/review', {
                rating,
                reviewText,
                bookId,
                userId, // Use the fetched userId
            });
            alert('Review added successfully!');
            onClose(); // Close the modal after submission
        } catch (error) {
            setError('Failed to add review.');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="review-form-modal" onClick={(e) => e.stopPropagation()}>
                <h3>Leave a Review</h3>
                <form onSubmit={handleSubmit}>
                    <label>Rating:</label>
                    <input 
                        type="number" 
                        min="1" 
                        max="5" 
                        value={rating} 
                        onChange={(e) => setRating(Number(e.target.value))} 
                        required
                    />
                    <label>Review:</label>
                    <textarea 
                        value={reviewText} 
                        onChange={(e) => setReviewText(e.target.value)} 
                        rows="4" 
                        required
                    />
                    {error && <p className="error">{error}</p>}
                    <div className="modal-buttons">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReviewFormModal;
