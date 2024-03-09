import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from 'GameContext';
import { createFullLoop } from 'scripts/generateLoop';
import LoopTile, { ILoopTile } from './LoopTile';
import { Ship } from './Ship';

const Loop = ({ }) => {
    const { gameState, setGameState } = useContext(GameContext);

    return (
        <>
            <div id="loop">
                <Ship />
                {!gameState.loop && <div>Oops</div>}
                {gameState.loop && gameState.loop.map((cell, i) => {
                    return <LoopTile {...cell} key={"tile" + i} idx={i} />
                })
                }
            </div>
        </>
    );
}

export default Loop