import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchComponent.css';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchTerm.trim()) { // Ensure there's a search term
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`); // Encode the search term for URL safety
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="nav-search" // Add the class for styling
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>Search</button> {/* Add the class for styling */}
    </div>
  );
};

export default SearchComponent; // Ensure this line is present
