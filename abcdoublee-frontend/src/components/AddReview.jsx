import { useState, setState } from 'react';

import './AddReview.css';

export default function AddReview({bookId, userId}) {
    const [rating, setRating] = useState(-1);
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
            console.log(rating+" "+reviewText+" "+bookId+" "+userId);
            const response = await apiClient.post('/Review', {
                rating,
                reviewText,
                bookId,
                userId
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to add a review.";
            throw new Error(errorMessage);
        }
    }

  return (
    <form onSubmit={handleSubmit}>
      <label>Rating:
      <input 
        type="number" 
        name="rating" 
        value={rating}
        onChange={handleRating}
      />
      </label>
      <label>Review:
        <input 
          type="text" 
          name="review" 
          value={reviewText}
          onChange={handleReview}
        />
        </label>
        <input type="submit" />
    </form>
  )
}