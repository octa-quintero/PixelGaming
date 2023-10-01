import React, { useState } from 'react';
import style from './gamesStyle.module.css';
import Cards from './cards/cards.js';
import Filter from './filter/filter.js';

function Games() {
  const [filterValues, setFilterValues] = useState({
    selectedTags: [],
    selectedPlatform: 'all',
  });

  const handleFilterChange = (selectedTags, selectedPlatform) => {
    setFilterValues({ selectedTags, selectedPlatform });
  };

  return (
    <div className={style.gamesContainer}>
      <Filter onFilterChange={handleFilterChange} />
      <Cards filterValues={filterValues} />
    </div>
  );
}

export default Games;
