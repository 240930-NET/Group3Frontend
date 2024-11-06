import { useEffect, useState } from 'react';
import { apiClient } from '../api/api';
import PreferenceList from '../components/PreferenceList';
import SearchSelectModal from '../components/SearchSelectModal';
import './PreferencePage.css';

function PreferencePage() {
  const [preference, setPreference] = useState(null);
  const [modalConfig, setModalConfig] = useState(null);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await apiClient.get('/preference');
        setPreference(response.data);
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };

    fetchPreferences();
  }, []);

  // Remove a preference item
  const removePreferenceItem = async (type, id) => {
    try {
      await apiClient.delete(`/preference/${type}/${id}`);
      setPreference((prev) => ({
        ...prev,
        [`${type}s`]: prev[`${type}s`].filter((item) => item[`${type}Id`] !== id),
      }));
    } catch (error) {
      console.error(`Error removing ${type}:`, error);
    }
  };

  // Add a genre, author, or book
  const addPreferenceItem = async (type, itemId) => {
    try {
      const response = await apiClient.post(`/preference/${type}`, { [`${type}Id`]: itemId });
      setPreference((prev) => ({
        ...prev,
        [`${type}s`]: [...prev[`${type}s`], response.data],
      }));
    } catch (error) {
      console.error(`Error adding ${type}:`, error);
    }
  };

  // Open modal with configuration for adding genres, authors, or books
  const openModal = (type) => {
    const config = {
      title: type.charAt(0).toUpperCase() + type.slice(1),
      fetchUrl: `/${type}s`,
      onSelect: (item) => addPreferenceItem(type, item.id),
    };
    setModalConfig(config);
  };

  return (
    <div className="preference-page">
      <h1>Your Preferences</h1>

      <PreferenceList
        title="Genres"
        preferences={preference?.genres}
        onRemove={(id) => removePreferenceItem('genre', id)}
        onAdd={() => openModal('genre')}
      />

      <PreferenceList
        title="Authors"
        preferences={preference?.authors}
        onRemove={(id) => removePreferenceItem('author', id)}
        onAdd={() => openModal('author')}
      />

      <PreferenceList
        title="Books"
        preferences={preference?.books}
        onRemove={(id) => removePreferenceItem('book', id)}
        onAdd={() => openModal('book')}
      />

      {modalConfig && (
        <div className='modal'>
        <SearchSelectModal
          title={modalConfig.title}
          fetchUrl={modalConfig.fetchUrl}
          onSelect={modalConfig.onSelect}
          onClose={() => setModalConfig(null)}
        />
        </div>
      )}
    </div>
  );
}

export default PreferencePage;
