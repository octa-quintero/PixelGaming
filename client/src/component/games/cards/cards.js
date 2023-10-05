import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames } from '../../../redux/action.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComputer,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../searchBar/searchBar.js'
import style from './cardsStyle.module.css';

function Cards() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames) || [];
  const filteredGames = useSelector((state) => state.filteredGames) || [];
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [SearchGames, setFilteredGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  // Actualiza el estado de búsqueda cuando se hacen cambios en los checkboxes y el select en Filter
  const handleFilterChange = (newFilteredGames) => {
    setFilteredGames(newFilteredGames);
  };

  // Función para obtener una selección aleatoria de juegos
  const getRandomGames = (games, count) => {  
    const shuffledGames = games.slice(); // Clonamos el array para no modificar el original
    for (let i = shuffledGames.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledGames[i], shuffledGames[j]] = [shuffledGames[j], shuffledGames[i]]; // Intercambiar elementos aleatoriamente
    }
    return shuffledGames.slice(0, count); // Tomar los primeros 'count' juegos
  };

  
  useEffect(() => {
    const filtered = allGames.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setFilteredGames(filtered);
  }, [allGames, searchTerm])

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(getAllGames());
        console.log('Datos cargados correctamente');
        setIsLoading(false); // Marcar que los datos se han cargado
      } catch (error) {
        console.error('Error al obtener los juegos:', error);
      }
    }

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // Realizar la búsqueda y almacenar los resultados en searchResults
    const filtered = allGames.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered);
  }, [allGames, searchTerm]);

  // Obtener juegos aleatorios de acuerdo a si se ha realizado una búsqueda o no
  const randomGames = (() => {
    if (searchTerm.length === 0 && filteredGames.length === 0) {
      // Si no hay término de búsqueda y no hay categorías seleccionadas, mostrar juegos aleatorios
      return getRandomGames(allGames, 30);
    } else if (searchTerm.length === 0) {
      // Si no hay término de búsqueda pero hay categorías seleccionadas, mostrar juegos filtrados
      return filteredGames;
    } else {
      // Si hay un término de búsqueda, mostrar los resultados de la búsqueda
      return searchResults;
    }
  })();
  
  return (
    <div className={style.cardsGamesContainer}>
      <div className={style.cards}>
      <SearchBar onSearchChange={setSearchTerm} />
        <div className={style.cardContent}>
          {Array.isArray(randomGames) && randomGames.map((game) => (
            <div className={style.cardContent1} key={game.id}>
              <img src={game.thumbnail} alt={game.title} className={style.cardImage} />
              <div className={style.title}>
                <h2 className={style.cardTitle}>{game.title}</h2>
                <h3 className={style.shortDescription}>{game.short_description}</h3>
                <div className={style.plattformButton}>
                  <h4 className={style.genre}>{game.genre}</h4>
                  <div className={style.icon}>
                    {game.platform.includes('PC') ? (
                      <FontAwesomeIcon icon={faComputer} />
                    ) : game.platform.includes('Web') ? ( 
                      <FontAwesomeIcon icon={faGlobe} />
                    ) : (
                      game.platform
                    )}
                  </div>
                  <a href={game.game_url} className={style.cardBtn}>Play Now!</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}  

export default Cards;