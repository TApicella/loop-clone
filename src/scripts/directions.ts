import { rotate, atan2, deepEqual as arrayEqual, to as toUnit, unit } from 'mathjs';
import Vector, { rotationConst } from './vectors';

//Up, Right, Down, Left
export const clockwisePath = [
    [0, -1], [1, 0], [0, 1], [-1, 0], 
]

export const indexToDirection = {
    0: "UP",
    1: "RIGHT",
    2: "DOWN",
    3: "LEFT"
}

export const directionToIndex = {
    "UP": 0,
    "RIGHT": 1,
    "DOWN": 2,
    "LEFT": 3
}

export const getRotation = (direction) => {
  return {
    "UP": 0,
    "RIGHT": "0.25turn",
    "DOWN": "0.5turn",
    "LEFT": "0.75turn",
  }[direction]
}

export const nextDir = (dir) => {
    return (dir+1)%4
}

export class Direction {
    x: number;
    y: number;
    vector: Vector;

    constructor(collection) {
        if(!(collection instanceof Vector)){
            collection = new Vector(collection);
        }
        this.x = collection.x;
        this.y = collection.y;
        this.vector = collection;
    }

  rotate(angle){
    this.vector = this.vector.rotate(angle);
    return this
  }

  rotateCW90(){
    return this.rotate(rotationConst.CW_90);
  }

  rotateCCW90(){
    return this.rotate(rotationConst.CCW_90);
  }

  get name(){
    const dirIndex = clockwisePath.findIndex((dir) => {
        return arrayEqual([this.x, this.y], dir)
    })
    if(dirIndex === -1){
        const theta = atan2(this.y, this.x);
        return toUnit(unit(theta,"rad"), "deg").toString();
    }
    else {
        return indexToDirection[dirIndex]
    }
  }

  get cardinalIdx(){
    const dirIndex = clockwisePath.findIndex((dir) => {
        return arrayEqual([this.x, this.y], dir)
    })
    
    return dirIndex > -1 ? dirIndex : null
  }
}