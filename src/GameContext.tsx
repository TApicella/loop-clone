import { Context, createContext } from 'react';

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
