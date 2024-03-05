import { rotate, unit } from 'mathjs';

export const rotationConst = {
    CW_90: unit('90deg'),
    CCW_90: unit('-90deg')
}

class Vector {
    x: number;
    y: number;
    z?: number;
    vector: number[];

    constructor(collection) {
        this.vector = collection;
        this.setXYZ(collection);
    }

  setXYZ(vector){
    if (vector.length === 3) {
        [this.x, this.y, this.z] = vector;
    }
    else {
        [this.x, this.y] = vector;
    }

  }

  rotate(angle){
    this.vector = rotate(this.vector, angle);
    this.setXYZ(this.vector);
    return this
  }

  rotateCW90(){
    return this.rotate(rotationConst.CW_90);
  }

  rotateCCW90(){
    return this.rotate(rotationConst.CCW_90);
  }

  static toVector(collection){
    return new Vector(collection)
  }
}

export default Vector