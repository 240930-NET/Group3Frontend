// ShowReviewModal.jsx
import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/api.jsx';
import './ShowReviewModal.css';

function ShowReviewModal({ bookId, onClose }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(`/review/GetReviewsByBookId/${bookId}`);
            setReviews(response.data);
        } catch (error) {
            setError("Error fetching reviews.");
            console.error(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [bookId]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="show-review-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Reviews for Book ID: {bookId}</h2>
                {loading ? (
                    <p>Loading reviews...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.reviewId} className="review-item">
                            <p><strong>Rating:</strong> {review.rating}</p>
                            <p>{review.reviewText}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews for this book.</p>
                )}
            </div>
        </div>
    );
}

export default ShowReviewModal;
