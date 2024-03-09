import React, { useContext, useEffect, useState } from 'react';
import Editor from './Editor';
import { GameContext } from 'GameContext';
import { createFullLoop } from 'scripts/generateLoop';
import LoopTile from './LoopTile';
import Loop from './Loop';
import { add as arrayAdd, subtract as arraySubtract } from 'mathjs';
import { ShipConstants } from './Ship';
import { useInterval } from 'scripts/useInterval';

const GameWrapper = ({ }) => {
    const { gameState, setGameState } = useContext(GameContext);
    const [gameInit, setGameInit] = useState(false);

    useEffect(() => {
        if (!gameInit) {
            let loop = createFullLoop();
            setGameState({
                ...gameState,
                shipCoords: [...loop[0].point],
                shipIdx: 0,
                loop
            })
            setGameInit(true);
        }
    }, [])

    useInterval(() => {
        // Each tick of game time

        let { shipIdx, loop, shipCoords } = gameState;

        if (!loop) {
            return
        }

        if (shipIdx < loop.length - ShipConstants.SHIP_SPEED) {
            shipIdx += ShipConstants.SHIP_SPEED
        }
        else {
            shipIdx = 0;
        }
        let currentTileIdx = Math.floor(shipIdx);
        let nextTileIdx = (currentTileIdx + 1) % loop.length;
        let velocity = arraySubtract(loop[nextTileIdx].point, loop[currentTileIdx].point).map((n) => n * ShipConstants.SHIP_SPEED)

        shipCoords = arrayAdd(shipCoords, velocity);

        setGameState({ ...gameState, shipIdx, shipCoords: [...shipCoords] })
    }, 100)

    return (
        <div id="gameWrapper">
            <Loop />
        </div>
    );
}

export default GameWrapper
