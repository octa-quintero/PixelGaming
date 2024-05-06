import React from 'react';
import { BrowserRouter } from "react-router-dom";
import BaseLayout from "./component/baseLayout/BaseLayout";
import './App.module.scss';

function App() {
  return (
      <div>
        <BrowserRouter>
          <BaseLayout/>
        </BrowserRouter>
      </div>
  );
}
export default App;
  