import Matrix, { MatrixData } from "./matrix";

export default class Camera {
    x: number = 0;
    y: number = 0;
    z: number = 0;
    rx: number = 0;
    ry: number = 0;
    rz: number = 0;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    setPosition(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    
    setRotation(rx: number = 0, ry: number = 0, rz: number = 0) {
        this.rx = rx;
        this.ry = ry;
        this.rz = rz;
        return this;
    }

    get matrix(): MatrixData {
        let [x, y, z] = [this.x, this.y, this.z];
        let [rx, ry, rz] = [this.rx, this.ry, this.rz];

        return Matrix.create(x, y, z, rx, ry, rz);
    }
}