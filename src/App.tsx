import React from 'react';
import './App.css';
import Board from "./components/board/board";
import {Provider} from "mobx-react";
import {stores} from "./stores";

const App = () => {
  return (
    <Provider {...stores} >
      <div className="App">
       <Board />
      </div>
    </Provider>
  );
};

export default App;
