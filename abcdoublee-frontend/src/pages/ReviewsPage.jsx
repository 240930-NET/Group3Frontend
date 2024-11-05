import { useEffect, useState } from 'react';
import { apiClient } from '../api/api.jsx';
import { setAuthToken } from '../api/api.jsx';

import './ReviewsPage.css';

export default function ReviewsPage({bookId}) {
    const [reviewList, setReviewList] = useState();
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
              setAuthToken(token);
              //console.log("on UserPage: Token set on reload:", token);
            }
            const response = await apiClient.get('/Review/GetReviewsByBookId/'+bookId);
            const reviews = response.data;

            const reviewList = reviews.map(review => 
                <div key = {review.reviewId} className='review'>
                    <p>Rating: {review.rating}</p>
                    <p>Review: {review.reviewText}</p>
                    <p>Rated by: {review.user.fullName}</p>
                </div>);
            setReviewList(reviewList);
        } catch (error) {
            console.error("On Reviews: Error fetching reviews:", error.response?.data || error.message);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className='reviews'>
            <h1>Here are some reviews for this book!</h1>
            {reviewList}
        </div>
    );
}