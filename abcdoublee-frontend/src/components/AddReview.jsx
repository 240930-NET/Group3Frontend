import { useState, setState } from 'react';

import './AddReview.css';
import { apiClient } from '../api/api';

export default function AddReview({bookId, userId}) {
    const [rating, setRating] = useState("");
    const [reviewText, setReviewText] = useState("");

    const handleRating = (e) => {
        setRating(e.target.value);
    }
    const handleReview = (e) => {
        setReviewText(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/review', {
              rating,
              reviewText,
              bookId,
              userId
            });
            setRating("");
            setReviewText("");
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to add a review.";
            throw new Error(errorMessage);
        }
    }

  return (
    <div className='reviewBox'>
      <h3>Would you like to leave a review for this book?</h3>
      <form onSubmit={handleSubmit}>
        <label>Rating:
        <input 
          type="number" 
          name="rating" 
          value={rating}
          placeholder='Enter your rating'
          onChange={handleRating}
        />
        </label>
        <label>Review:
          <input 
            type="text" 
            name="review" 
            value={reviewText}
            placeholder='Write your review'
            onChange={handleReview}
          />
          </label>
          <input type="submit" className='submitReviewButton'/>
      </form>
    </div>
  )
}