import Maths from "./math";

export default class Camera {
    static x: number = 0;
    static y: number = 0;
    static z: number = 0;
    static yaw: number = 0;
    static pitch: number = 0;
    static roll: number = 0;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        Camera.x = x;
        Camera.y = y;
        Camera.z = z;
    }

    static setPosition(x: number = 0, y: number = 0, z: number = 0) {
        Camera.x = x;
        Camera.y = y;
        Camera.z = z;
    }
    
    static setRotation(yaw: number = 0, pitch: number = 0, roll: number = 0) {
        Camera.yaw = yaw;
        Camera.pitch = pitch;
        Camera.roll = roll;
    }

    static projectToViewTranslation(x: number, y: number, z: number): [number, number, number] {
        let dist1 = Maths.distance2D(Camera.x, Camera.y, x, y);
        let dist2 = dist1 / (1+(1-Math.cos(Maths.degToRad(Camera.pitch))));
    
        let angle1 = Math.atan2(Camera.y - y, Camera.x - x) + Maths.degToRad(Camera.yaw) + Math.PI;
        let angle2 = Math.atan2(Camera.z - z, dist1) - Maths.degToRad(Camera.pitch) + Math.PI;
    
        let x2 = Math.cos(angle1) * dist2;
        let y2 = Math.sin(angle1) * dist2;
        let z2 = Math.sin(angle2) * dist2;
    
        return [x2, y2, z2];
    }
}