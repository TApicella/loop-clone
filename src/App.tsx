import React, { Context, useState } from 'react';
import './styles/index.css';

import GameWrapper from 'components/GameWrapper';

import { createContext } from 'react';
import { createFullLoop } from 'scripts/generateLoop';

export interface IGameContext {
  gameState: any;
  setGameState?: (any) => void;
  updateQueue: any;
  setUpdateQueue?: (any) => void;
  drawQueue: any;
  setDrawQueue?: (any) => void;
}

export type IContext = Context<IGameContext>

export const GameContext: IContext = createContext({
  gameState: {},
  updateQueue: [],
  drawQueue: [],
});

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