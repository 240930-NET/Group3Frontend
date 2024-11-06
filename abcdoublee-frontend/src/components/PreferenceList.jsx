import React from 'react';
import PreferenceItem from './PreferenceItem';
import './PreferenceList.css';

const PreferenceList = ({ title, preferences, onAdd, onRemove }) => (
  <section className="preference-list-container">
    <h2>{title}</h2>
    {preferences && preferences.length > 0 ? (
      <ul>
        {preferences.map((pref) => {
          const key = `${title.toLowerCase()}-${pref.genreId || pref.authorId || pref.bookId}`;
          return (
            <PreferenceItem
              key={key}
              preference={pref}
              onRemove={onRemove}
            />
          );
        })}
      </ul>
    ) : (
      <p>No favorite {title.toLowerCase()} added.</p>
    )}
    {onAdd && <button className="add-button" onClick={onAdd}>Add {title.slice(0, -1)}</button>}
  </section>
);

export default PreferenceList;
