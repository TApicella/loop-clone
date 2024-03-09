import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from 'GameContext';
import { GridConstants, getPointInPx } from 'scripts/grid';
import { getRotation } from 'scripts/directions';

export const ShipConstants = {
    SHIP_SPEED: 0.1
}

export const Ship = () => {
    const {shipCoords, shipIdx, loop} = useContext(GameContext).gameState;
    
    const coordsCheck = shipCoords ? [...shipCoords] : [0, 0];

    let ship = document.getElementById("ship");
    useEffect(() => {
        if(ship && loop){
            let shipPoint = getPointInPx(shipCoords, GridConstants.TILE_WIDTH, GridConstants.TILE_OFFSET, true);
            let shipTile = loop[Math.floor(shipIdx)];
            ship.style.setProperty('--shipX', `${shipPoint[0]}px`)
            ship.style.setProperty('--shipY', `${shipPoint[1]}px`)
            ship.style.setProperty('--shipRot', getRotation(shipTile.directionName) || 0 );
        }
    }, [coordsCheck[0], coordsCheck[1]])

    return (
        <div id="ship">

        </div>
    )
}