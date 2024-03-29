import React from 'react';
import './App.css';
import Board from './components/board/board';
import {Provider} from 'mobx-react';
import AppStore from './stores/app-store';
import {create} from 'mobx-persist';

const App = () => {
  const hydrate = create();
  hydrate('app-store', AppStore).then(() => {
    // Init timer after hydration
    if(AppStore.gameStarted) {
      AppStore.startTimer();
    }
  });

  document.onselectstart = function() {
    return false;
  };

  return (
    <Provider AppStore={AppStore}>
      <div className='App'>
       <Board />
      </div>
    </Provider>
  );
};

export default App;
