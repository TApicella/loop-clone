import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from 'App';
import { createFullLoop } from 'scripts/generateLoop';
import LoopTile, { ILoopTile } from './LoopTile';

const Loop = ({ }) => {
    const { gameState, setGameState } = useContext(GameContext);
    const [loopCreated, setLoopCreated] = useState(!!gameState.loop)

    useEffect(() => {
        if (!loopCreated) {
            let loop = createFullLoop();
            console.log(loop);
            setGameState({ ...gameState, loop })
            setLoopCreated(true);
        }
    })

    return (
        <div id="loop">
            {!gameState.loop && <div>Oops</div>}
            {gameState.loop && gameState.loop.map((cell, i) => {
                return <LoopTile {...cell} key={"tile"+i} idx={i}/>
            })
            }
        </div>
    );
}

export default Loop