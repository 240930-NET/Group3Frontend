import { useEffect, useState } from 'react';
import { apiClient } from '../api/api';
import PreferenceList from '../components/PreferenceList';
import SearchSelectModal from '../components/SearchSelectModal';
import './PreferencePage.css';

function PreferencePage() {
  const [modalConfig, setModalConfig] = useState(null);
  const [preference, setPreference] = useState({
    genres: [],
    authors: [],
    books: []
  });


  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await apiClient.get('/preference');
        console.log('Fetched preferences:', response.data);
        setPreference(response.data);
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };

    fetchPreferences();
  }, []);

  const removePreferenceItem = async (type, id) => {
    try {
      await apiClient.delete(`/preference/${type}/${id}`);
      
      // Refetch the updated preferences after deletion
      const response = await apiClient.get('/preference');
      setPreference(response.data);
    } catch (error) {
      console.error(`Error removing ${type}:`, error);
    }
  };

  const addPreferenceItem = async (type, id) => {
    try {
      await apiClient.post(`/preference/${type}`, id, {
        headers: { 'Content-Type': 'application/json' },
      });
      // Refetch the updated preferences after adding
      const response = await apiClient.get('/preference');
      setPreference(response.data);
    } catch (error) {
      console.error(`Error adding ${type}:`, error);
    }
  };

  // Open modal with configuration for adding genres, authors, or books
  const openModal = (type) => {
    const config = {
      title: type.charAt(0).toUpperCase() + type.slice(1),
      fetchUrl: `/${type}`,
      onSelect: (item) => addPreferenceItem(type, item[`${type}Id`])
    };
    setModalConfig(config);
  };

  return (
    <div className="preference-page">
      <h1>Your Preferences</h1>

      <PreferenceList
        title="Genres"
        preferences={preference?.preferenceGenres}
        onRemove={(id) => removePreferenceItem('genre', id)}
        onAdd={() => openModal('genre')}
      />

      <PreferenceList
        title="Authors"
        preferences={preference?.preferenceAuthors}
        onRemove={(id) => removePreferenceItem('author', id)}
        onAdd={() => openModal('author')}
      />

      <PreferenceList
        title="Books"
        preferences={preference?.preferenceBooks}
        onRemove={(id) => removePreferenceItem('book', id)}
        onAdd={() => openModal('book')}
      />

      {modalConfig && (
        <SearchSelectModal
          title={modalConfig.title}
          fetchUrl={modalConfig.fetchUrl}
          onSelect={modalConfig.onSelect}
          onClose={() => setModalConfig(null)}
        />
      )}
    </div>
  );
}

export default PreferencePage;
