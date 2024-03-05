import { pickRandom, add as arrayAdd, deepEqual as arrayEqual, clone } from "mathjs";

import { Direction, clockwisePath } from "./directions";

const initialLoop = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
]

const getPoint = (grid, [x, y]) => {
    if (y < 0 || y >= grid.length) {
        return null
    }
    if (x < 0 || x >= grid[y].length) {
        return null
    }
    return grid[y][x];
}
const setPoint = (grid, [x, y], val) => {
    if (!grid) {
        console.error("GRID UNDEFINED")
    }
    if (y < 0 || y >= grid.length) {
        return -1
    }
    if (x < 0 || x >= grid[y].length) {
        return -1
    }
    let newGrid = clone(grid);
    newGrid[y][x] = val;
    return newGrid;
}

const createLoopBumps = () => {
    const loop = JSON.parse(JSON.stringify(initialLoop));

    // top
    let topX = pickRandom([2, 3, 4])
    let topY = 1;

    loop[topY][topX] = 0;
    loop[topY - 1][topX] = 1;
    loop[topY - 1][topX - 1] = 1;
    loop[topY - 1][topX + 1] = 1;

    // bottom
    let botX = pickRandom([2, 3, 4])
    let botY = 5;

    loop[botY][botX] = 0;
    loop[botY + 1][botX] = 1;
    loop[botY + 1][botX - 1] = 1;
    loop[botY + 1][botX + 1] = 1;

    // left
    let leftX = 1;
    let leftY = pickRandom([2, 3, 4]);

    loop[leftY][leftX] = 0;
    loop[leftY][leftX - 1] = 1;
    loop[leftY - 1][leftX - 1] = 1;
    loop[leftY + 1][leftX - 1] = 1;

    // right
    let rightX = 5;
    let rightY = pickRandom([2, 3, 4]);

    loop[rightY][rightX] = 0;
    loop[rightY][rightX + 1] = 1;
    loop[rightY - 1][rightX + 1] = 1;
    loop[rightY + 1][rightX + 1] = 1;

    return loop
}

const findFirstNewNeighbor = (loopGrid, startPoint, startDirIdx, matchVal = 1) => {
    for (let i = 0; i < 4; i++) {
        let testIdx = (i + startDirIdx) % 4;
        let testCoord = arrayAdd(startPoint, clockwisePath[testIdx]);
        if (getPoint(loopGrid, testCoord) === matchVal) {
            let dir = new Direction(clockwisePath[testIdx])
            return { point: testCoord, dir, directionName: dir.name }
        }
    }
    return { point: null, dir: null, directionName: null }
}

const findNeighborsWithValue = (loopGrid, startPoint, matchVal, countEdges = false) => {
    const neighbors = [];
    for (let i = 0; i < 4; i++) {
        let testCoord = arrayAdd(startPoint, clockwisePath[i]);
        if (getPoint(loopGrid, testCoord) === matchVal || (countEdges && getPoint(loopGrid, testCoord) === null)) {
            let dir = new Direction(clockwisePath[i])
            neighbors.push({ point: testCoord, dir, directionName: dir.name });
        }
    }
    return neighbors;
}

export const createFullLoop = () => {
    let loopGrid = createLoopBumps()

    //Find loop start
    let loopStart;
    let loopData = [];
    if (getPoint(loopGrid, [1, 0]) === 1) {
        loopStart = [1, 0]
    }
    else if (getPoint(loopGrid, [1, 1]) === 1) {
        loopStart = [1, 1]
    }
    else {
        console.error("Loop start not found")
        return null
    }

    let { point, dir } = findFirstNewNeighbor(loopGrid, loopStart, 0);

    loopGrid = setPoint(loopGrid, loopStart, 3);

    let emptyNeighbors = findNeighborsWithValue(loopGrid, loopStart, 0, true);

    let dirData = []

    loopData.push({ point: [...loopStart], nextDirection: dir, directionName: dir.name, emptyNeighbors: [...emptyNeighbors] });
    dirData.push(dir.name);
    loopGrid = setPoint(loopGrid, point, 2);


    let counter = 0;
    while (point && !arrayEqual(point, loopStart) && counter < 1000) {
        let newNeighbor = findFirstNewNeighbor(loopGrid, point, dir.cardinalIdx);

        let newpoint = newNeighbor.point;
        let newdir = newNeighbor.dir;

        if (!newpoint) {
            counter = 1001;
            continue;
        }

        emptyNeighbors = findNeighborsWithValue(loopGrid, point, 0, true);
        loopData.push({ point: [...point], nextDirection: newdir, directionName: newdir.name, emptyNeighbors: [...emptyNeighbors] });
        dirData.push(newdir.name);
        loopGrid = setPoint(loopGrid, point, 2);
        point = newpoint;
        dir = newdir;
        counter++;
    }
    let newNeighbor = findFirstNewNeighbor(loopGrid, point, dir.cardinalIdx, 3);

    let newpoint = newNeighbor.point;
    dir = newNeighbor.dir;

    if (newpoint) {
        emptyNeighbors = findNeighborsWithValue(loopGrid, point, 0, true);
        loopData.push({ point: [...point], nextDirection: dir, directionName: dir.name, emptyNeighbors: [...emptyNeighbors] });
        dirData.push(dir.name);
        loopGrid = setPoint(loopGrid, point, 2);
    }

    return loopData;
}