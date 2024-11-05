import React from 'react';

const PreferenceItem = ({ preference, onRemove }) => {
  const type = Object.keys(preference)[0]; // Detect the type (genre, author, book)
  const item = preference[type];

  return (
    <li>
      {item.name || item.title} {/* Use `name` for genre/author and `title` for book */}
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  );
};

export default PreferenceItem;
