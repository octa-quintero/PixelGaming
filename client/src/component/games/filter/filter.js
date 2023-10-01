  import React, { useState } from 'react';
  import { useDispatch } from 'react-redux';
  import { fetchGamesByTagsAndPlatform } from '../../../redux/action.js';
  import style from './filterStyle.module.css';

  function Filter() {
    const [selectedTags, setSelectedTags] = useState([]); // Estado local para las etiquetas seleccionadas
    const [selectedPlatform, setSelectedPlatform] = useState(''); // Estado local para la plataforma seleccionada
    const dispatch = useDispatch();

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

    // Manejar la búsqueda cuando se hace clic en el botón de búsqueda
    const handleSearch = () => {
      // Construir la cadena de etiquetas seleccionadas
      const tagsQueryString = selectedTags.join('.');
    
      // Realizar una solicitud para filtrar juegos con las etiquetas y la plataforma seleccionadas
      console.log('Despachando acción de búsqueda'); // Agrega este console.log
      dispatch(fetchGamesByTagsAndPlatform(tagsQueryString, selectedPlatform));
    };

    return (
      <div className={style.filterContainer}>
        <h2>Selecciona etiquetas para filtrar juegos:</h2>
        <div className={style.checkboxContainer}>
          <label key="shooter" className={style.checkboxLabel}>
            <input
              type="checkbox"
              value="shooter"
              checked={selectedTags.includes('shooter')}
              onChange={() => handleTagChange('shooter')}
            />
            Fantasy
          </label>
          <label key="fantasy" className={style.checkboxLabel}>
            <input
              type="checkbox"
              value="fantasyr"
              checked={selectedTags.includes('fantasy')}
              onChange={() => handleTagChange('fantasy')}
            />
            Shooter
          </label>

          {/* Repite el bloque anterior para otras etiquetas */}
        </div>

        <div className={style.platformSelect}>
          <label>Selecciona una plataforma:</label>
          <select onChange={(e) => setSelectedPlatform(e.target.value)} value={selectedPlatform}>
            <option value="all">all</option>
            <option value="pc">pc</option>
            <option value="browser">web</option>
            {/* Agrega más opciones según las plataformas disponibles */}
          </select>
        </div>

        <button onClick={handleSearch}>Buscar</button>
      </div>
    );
  }

  export default Filter;
