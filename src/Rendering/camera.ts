export default class Camera {
    static x: number = 0;
    static y: number = 0;
    static z: number = 0;
    static rx: number = 0;
    static ry: number = 0;
    static rz: number = 0;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        Camera.x = x;
        Camera.y = y;
        Camera.z = z;
    }

    setPosition(x: number = 0, y: number = 0, z: number = 0) {
        Camera.x = x;
        Camera.y = y;
        Camera.z = z;
    }
    
    setRotation(rx: number = 0, ry: number = 0, rz: number = 0) {
        Camera.rx = rx;
        Camera.ry = ry;
        Camera.rz = rz;
    }
}

new Camera();