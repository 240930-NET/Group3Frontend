// src/pages/PollutePage.jsx
import React, { useState } from 'react';
import { apiClient } from '../api/api.jsx';
import './PollutePage.css'; // Create this CSS file for styling

function PollutePage() {
  const [authorName, setAuthorName] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [message, setMessage] = useState('');

  const handlePopulateByAuthor = async () => {
    try {
    const response = await apiClient.post(`/google/populate/books/by-author?authorName=${authorName}`);
      setMessage(response.data);
    } catch (error) {
      setMessage(`Error: ${error.response?.data || error.message}`);
    }
  };

  const handlePopulateByName = async () => {
    try {
        const response = await apiClient.post(`/google/populate/books/by-name?bookTitle=${bookTitle}`);      setMessage(response.data);
    } catch (error) {
      setMessage(`Error: ${error.response?.data || error.message}`);
    }
  };

  return (
    <div className="pollute-page">
      <h1>Populate Database with Books</h1>

      <div className="input-group">
        <label htmlFor="authorName">Author Name:</label>
        <input
          id="authorName"
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
        <button onClick={handlePopulateByAuthor}>Populate</button>
      </div>

      <div className="input-group">
        <label htmlFor="bookTitle">Book Title:</label>
        <input
          id="bookTitle"
          type="text"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />
        <button onClick={handlePopulateByName}>Populate</button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}

export default PollutePage;
