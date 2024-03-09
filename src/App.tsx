import React, { useState } from 'react';
import './styles/index.css';
import { GameContext } from 'GameContext';

import GameWrapper from 'components/GameWrapper';

import { createFullLoop } from 'scripts/generateLoop';

const App = ({ }) => {
  let [gameState, setGameState] = useState({});
  let [drawQueue, setDrawQueue] = useState([]);
  let [updateQueue, setUpdateQueue] = useState([]);

  let ctx = { gameState, setGameState, drawQueue, setDrawQueue, updateQueue, setUpdateQueue }

  return (
    <div>
      <GameContext.Provider value={{ ...ctx }}>
        <div id="globalListener">
          <GameWrapper />
        </div>
      </GameContext.Provider>
    </div>
  );
}

export default App