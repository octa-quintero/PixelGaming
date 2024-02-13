import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { getRandomGamesByCategory } from "../../redux/action.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./categoryStyle.module.css";

function Category() {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(getRandomGamesByCategory(categoryName));
  }, [dispatch, categoryName]);

  return (
    <div>
      <h2>{categoryName}</h2>
    </div>
  );
}

export default Category;
