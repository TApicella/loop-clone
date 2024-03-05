import React from 'react';
import { add as arrayAdd, map } from 'mathjs';
import { Direction } from 'scripts/directions';

export interface ILoopTile {
    point: number[];
    nextDirection: Direction;
    directionName: string;
}

const LoopTile = ({ point, nextDirection, directionName, emptyNeighbors, idx }) => {
    // Translate the point
    point = arrayAdd(point, [0.25, 0.25]).map((n) => n * 112);

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

    if (directionName === "UP") {
        let filteredNames = neighborDirNames.filter((n) => n != "down");
        if (filteredNames.length === 1) {
            classNamesExtra[0].push(`border-up-down--${filteredNames[0]}`)
            classNamesExtra[0].push(`flex-to-${filteredNames[0]}-${idx%3}`);
            classNamesExtra[1].push(`border-up-${filteredNames[0]}`)
            classNamesExtra[1].push(`flex-to-up-${idx%3}`);
        }
        else {
            classNamesExtra[0].push(`border-up-${filteredNames[0]}`)
            classNamesExtra[0].push(`flex-to-up-${idx%3}`);
            classNamesExtra[1].push(`border-up-${filteredNames[1]}`)
            classNamesExtra[1].push(`flex-to-up-${idx%3}`);
        }
    }
    if (directionName === "RIGHT") {
        let filteredNames = neighborDirNames.filter((n) => n != "left");
        if (filteredNames.length === 1) {
            classNamesExtra[0].push(`border-right-left--${filteredNames[0]}`)
            classNamesExtra[0].push(`flex-to-${filteredNames[0]}-${idx%3}`);
            classNamesExtra[1].push(`border-right-${filteredNames[0]}`)
            classNamesExtra[1].push(`flex-to-right-${idx%3}`);
        }
        else {
            classNamesExtra[0].push(`border-right-${filteredNames[0]}`)
            classNamesExtra[0].push(`flex-to-right-${idx%3}`);
            classNamesExtra[1].push(`border-right-${filteredNames[1]}`)
            classNamesExtra[1].push(`flex-to-right-${idx%3}`);
        }

    }
    if (directionName === "DOWN") {
        let filteredNames = neighborDirNames.filter((n) => n != "up");
        if (filteredNames.length === 1) {
            classNamesExtra[0].push(`border-down-up--${filteredNames[0]}`)
            classNamesExtra[0].push(`flex-to-${filteredNames[0]}-${idx%3}`);
            classNamesExtra[1].push(`border-down-${filteredNames[0]}`)
            classNamesExtra[1].push(`flex-to-down-${idx%3}`);
        }
        else {
            classNamesExtra[0].push(`border-down-${filteredNames[0]}`)
            classNamesExtra[0].push(`flex-to-down-${idx%3}`);
            classNamesExtra[1].push(`border-down-${filteredNames[1]}`)
            classNamesExtra[1].push(`flex-to-down-${idx%3}`);
        }

    }
    if (directionName === "LEFT") {
        let filteredNames = neighborDirNames.filter((n) => n != "right");
        if (filteredNames.length === 1) {
            classNamesExtra[0].push(`border-left-right--${filteredNames[0]}`)
            classNamesExtra[0].push(`flex-to-${filteredNames[0]}-${idx%3}`);
            classNamesExtra[1].push(`border-left-${filteredNames[0]}`)
            classNamesExtra[1].push(`flex-to-left-${idx%3}`);
        }
        else {
            classNamesExtra[0].push(`border-left-${filteredNames[0]}`)
            classNamesExtra[0].push(`flex-to-left-${idx%3}`);
            classNamesExtra[1].push(`border-left-${filteredNames[1]}`)
            classNamesExtra[1].push(`flex-to-left-${idx%3}`);
        }

    }

    return (
        <>
            <div className={classNames.join(' ')} style={style}>
            </div>
            <div className={borderWrapperClassNames[0].join(' ')}>
                <div className={classNamesExtra[0].join(' ')} style={style}>
                </div>
            </div>
            <div className={borderWrapperClassNames[1].join(' ')}>
                <div className={classNamesExtra[1].join(' ')} style={style}>
                </div>
            </div>

        </>
    );
}

export default LoopTile
