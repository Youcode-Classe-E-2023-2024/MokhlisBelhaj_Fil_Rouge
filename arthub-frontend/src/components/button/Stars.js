import React from 'react';

// This component displays a star and handles click events
const Star = ({ selected, onClick }) => {
  return (
    <span
      style={{ cursor: 'pointer', color: selected ? 'gold' : 'gray' }}
      onClick={onClick}
    >
      &#9733;
    </span>
  );
};

export default Star;
