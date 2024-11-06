import React from 'react';

const PreferenceItem = ({ preference, onRemove }) => {
  const item = preference.book || preference.genre || preference.author;

  const displayText = item?.title || item?.name || "Unknown Item";
  const itemId = preference.bookId || preference.genreId || preference.authorId;

  return (
    <li className="preference-item">
      <span>{displayText}</span>
      <button onClick={() => onRemove(itemId)}>Remove</button>
    </li>
  );
};

export default PreferenceItem;


