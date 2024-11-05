//import React from 'react';

import './HomePage.css';
//import ReviewsPage from './ReviewsPage.jsx';
import AddReview from '../components/AddReview';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to ABCDoubleE Book Tracker</h1>
      <p>You can track your books in this application.</p>
      {/**
       * You can test ReviewsPage with this
       * <ReviewsPage bookId={2}/>
       */}
      <AddReview bookId={1} userId={1}/>
    </div>
  );
}

export default HomePage;
