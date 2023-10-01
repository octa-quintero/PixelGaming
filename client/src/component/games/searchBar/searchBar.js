import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import style from './searchBarStyle.module.css';

function SearchBar({ onSearchChange }) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className={style.search}>
      <h1 className={style.text}><FontAwesomeIcon icon={faGamepad} />{' '}Juegos</h1>
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

