import React from 'react';
import PreferenceItem from './PreferenceItem';

const PreferenceList = ({ title, preferences, onAdd, onRemove }) => (
  <section>
    <h2>{title}</h2>
    {preferences && preferences.length > 0 ? (
      <ul>
        {preferences.map((pref) => (
          <PreferenceItem
            key={pref.genreId || pref.authorId || pref.bookId}
            preference={pref}
            onRemove={onRemove}
          />
        ))}
      </ul>
    ) : (
      <p>No favorite {title.toLowerCase()} added.</p>
    )}
    {onAdd && <button onClick={onAdd}>Add {title.slice(0, -1)}</button>}
  </section>
);

export default PreferenceList;
