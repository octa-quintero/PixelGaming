import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGamesByTagsAndPlatform } from '../../../redux/action.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad
} from '@fortawesome/free-solid-svg-icons';
import style from './filterStyle.module.css';

function Filter() {
  const [selectedTags, setSelectedTags] = useState([]); // Estado local para las etiquetas seleccionadas
  const [selectedPlatforms, setSelectedPlatforms] = useState([]); // Estado local para la plataforma seleccionada
  const dispatch = useDispatch();

  // Define las opciones agrupadas por categoría
  const optionsByCategory = {
    "Géneros de Juegos": [
      'mmorpg', 'mmo', 'shooter', 'strategy', 'moba', 'battle-royale', 'card', 'racing', 'sports', 'social', 'action'
    ],
    "Gráficos": [
      '3d', '2d'
    ],
    "Modos de Combate": [
      'pvp', 'pve'
    ],
    "Estilos de Juego": [
      'turn-based', 'real-time'
    ],
    "Estilos de Juego": [
      'anime', 'fantasy', 'sci-fi', 'military', 'fighting'
    ],
    "Etiquetas": [
      'sandbox', 'open-world', 'survival', 'pixel', 'voxel', 'first-person', 'third-Person',
      'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'side-scroller',
      'mmofps', 'action-rpg', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts'
    ]
  };

  // Manejar el cambio de estado cuando se selecciona/deselecciona una etiqueta
  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      // Si la etiqueta ya está seleccionada, quitarla
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      // Si la etiqueta no está seleccionada, agregarla
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePlatformChange = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      // Si la plataforma ya está seleccionada, quitarla
      setSelectedPlatforms(selectedPlatforms.filter((selectedPlatform) => selectedPlatform !== platform));
    } else {
      // Si la plataforma no está seleccionada, agregarla
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  //realizar la búsqueda cuando se cambian los checkboxes
  useEffect(() => {
    const tagsQueryString = selectedTags.join('.');
    const selectedPlatform = selectedPlatforms.length > 0 ? selectedPlatforms[0] : 'all';
    dispatch(fetchGamesByTagsAndPlatform(tagsQueryString, selectedPlatform));
  }, [selectedTags, selectedPlatforms, dispatch]);

  return (
    <div className={style.filterContainer}>
      <h1 className={style.text}><FontAwesomeIcon icon={faGamepad} />{' '}Juegos</h1>
      <div className={style.platformSelect}>
        <h3>Plataforma</h3>
        <hr></hr>
        <div>
          <label>
            <input
              type="checkbox"
              value="pc"
              checked={selectedPlatforms.includes('pc')}
              onChange={() => handlePlatformChange('pc')}
            />
            PC
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="browser"
              checked={selectedPlatforms.includes('browser')}
              onChange={() => handlePlatformChange('browser')}
            />
            Browser
          </label>
        </div>
      </div>
      {Object.keys(optionsByCategory).map((category) => (
        <div key={category} className={style.filter}>
          <h3>{category}</h3>
          <hr></hr>
          <div className={style.checkboxContainer}>
            {optionsByCategory[category].map((tag) => (
              <label key={tag} className={style.checkboxLabel}>
                <input
                  type="checkbox"
                  value={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Filter;