import React, { useState } from 'react';
import style from './searchBarStyle.module.css';

function SearchBar({ onSearchChange }) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className={style.search}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          onSearchChange(e.target.value); 
        }}
        className={style.searchInput}
        placeholder="Buscar..."
      />
    </div>
  );
}

export default SearchBar;

