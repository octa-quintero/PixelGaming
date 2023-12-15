import React from "react";
import style from "./libraryStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons';
import biblioteca from '../../assets/pixelArt/library.gif'

function Library() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1 className={style.title}><FontAwesomeIcon icon={faLayerGroup} />Biblioteca</h1>
      </div>
      <div className={style.content1}>
        <img src={biblioteca}></img>
      </div>
    </div>
)
};

export default Library;