// src/pages/PreferencePage.jsx
import { useEffect, useState } from 'react';
import { apiClient } from '../api/api';
import './PreferencePage.css';

function PreferencePage() {
  const [preference, setPreference] = useState(null);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        // Confirming token in Authorization header
        console.log("Authorization header:", apiClient.defaults.headers.common['Authorization']);

        const response = await apiClient.get('/preference'); // Make sure endpoint matches backend
        setPreference(response.data);
      } catch (error) {
        console.error('Error fetching preference:', error);
      }
    };

    fetchPreferences();
  }, []);

  if (!preference) {
    return <p>Loading preferences...</p>;
  }

  return (
    <div className="preference-page">
      <h1>Your Preferences</h1>

      {/* Display Favorite Genres */}
      <section>
        <h2>Favorite Genres</h2>
        {preference.preferenceGenres && preference.preferenceGenres.length > 0 ? (
          <ul>
            {preference.preferenceGenres.map((genreObj, index) => (
              <li key={index}>{genreObj.genre.name}</li> 
            ))}
          </ul>
        ) : (
          <p>No favorite genres added.</p>
        )}
      </section>

      {/* Display Favorite Books */}
      <section>
        <h2>Favorite Books</h2>
        {preference.preferenceBooks && preference.preferenceBooks.length > 0 ? (
          <ul>
            {preference.preferenceBooks.map((bookObj) => (
              <li key={bookObj.book.bookId}>{bookObj.book.title}</li>
            ))}
          </ul>
        ) : (
          <p>No favorite books added.</p>
        )}
      </section>

      {/* Display Favorite Authors */}
      <section>
        <h2>Favorite Authors</h2>
        {preference.preferenceAuthors && preference.preferenceAuthors.length > 0 ? (
          <ul>
            {preference.preferenceAuthors.map((authorObj, index) => (
              <li key={index}>{authorObj.author.name}</li> 
            ))}
          </ul>
        ) : (
          <p>No favorite authors added.</p>
        )}
      </section>
    </div>
  );
}

export default PreferencePage;
