import React from 'react';
import { add as arrayAdd, map } from 'mathjs';
import { Direction } from 'scripts/directions';
import { GridConstants, getPointInPx } from 'scripts/grid';

export interface ILoopTile {
    point: number[];
    nextDirection: Direction;
    directionName: string;
}

const LoopTile = ({ point, nextDirection, directionName, emptyNeighbors, idx }) => {
    // Translate the point
    point = getPointInPx(point, GridConstants.TILE_WIDTH, GridConstants.TILE_OFFSET);

    // Make absolute style
    const style: React.CSSProperties = {
        position: "absolute",
        backgroundPositionX: point[0] + "px",
        backgroundPositionY: point[1] + "px",
        left: point[0] + "px",
        top: point[1] + "px",
        color: "white",
    }

    let classNames = ["loopTile", "border-gradient-green"]

    let classNamesExtra = [["loopTileEdge", "border-gradient-green"], ["loopTileEdge", "border-gradient-green"]];
    let borderWrapperClassNames = [[], []]


    let num = 0;
    let prefix = `border-${directionName.toLowerCase()}-`;
    let neighborDirNames = emptyNeighbors.map((e) => e.directionName.toLowerCase());

    classNames = classNames.concat(neighborDirNames.map((e) => `border-${e}`));

    return (
        <>
            <div className={classNames.join(' ')} style={style}>
            </div>
        </>
    );
}

export default LoopTile
