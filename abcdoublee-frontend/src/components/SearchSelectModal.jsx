import { useEffect, useState } from 'react';
import { apiClient } from '../api/api';
import './SearchSelectModal.css';

const SearchSelectModal = ({ title, fetchUrl, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Trigger an empty search when the modal opens
    const fetchInitialResults = async () => {
      try {
        const response = await apiClient.get(`${fetchUrl}/search`, { params: { search: '' } });
        setSearchResults(response.data);
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      }
    };

    fetchInitialResults();
  }, [fetchUrl, title]); // Depend on fetchUrl to trigger on modal open

  const handleSearch = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    try {
      const response = await apiClient.get(`${fetchUrl}/search`, { params: { search: term } });
      setSearchResults(response.data);
    } catch (error) {
      console.error(`Error fetching ${title}:`, error);
    }
  };

  const handleSelect = (item) => {
    onSelect(item); 
    onClose(); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select {title}</h2>
        <input
          type="text"
          placeholder={`Search ${title.toLowerCase()}...`}
          value={searchTerm}
          onChange={handleSearch}
        />
        <ul>
          {searchResults.map((item) => (
            <li key={item.genreId || item.id}>
              {item.name || item.title}
              <button onClick={() => handleSelect(item)}>Select</button>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SearchSelectModal;
