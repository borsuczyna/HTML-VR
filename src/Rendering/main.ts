import Accelerometer from "../Devices/accelerometer";
import Window from "../Window/main";
import Camera from "./camera";
import { angleDifference, degToRad, distance2D, distance3D, radToDeg } from "./math";
import Matrix from "./matrix";

export default class Rendering {
    static getWindowMatrix(window: Window) {
        let [x, y, z] = [window.x, window.y, window.z];
        let [rx, ry, rz] = [window.rx, window.ry, window.rz];
        let [crx, cry, crz] = [Camera.rx, Camera.ry, Camera.rz];
        let [yaw, pitch, roll] = Accelerometer.orientation;
        
        rx -= pitch;
        ry -= roll;
        rz -= yaw;

        crx -= -angleDifference(0, degToRad(pitch))/2;
        cry -= -angleDifference(0, degToRad(roll))/2;
        crz -= -angleDifference(0, degToRad(yaw))/2;

        document.getElementById('debug')!.innerText = `
            yaw: ${yaw.toFixed(2)}
            pitch: ${pitch.toFixed(2)}
            roll: ${roll.toFixed(2)}
        `

        // z is up vector, y is forward vector
        let dist1 = distance2D(Camera.x, Camera.y, x, y);
        let dist2 = distance3D(Camera.x, Camera.y, Camera.z, x, y, z);
        let angle1 = Math.atan2(Camera.y - y, Camera.x - x) + Math.PI + crz;
        let angle2 = Math.atan2(Camera.z - z, dist1) + crx;

        x = Math.cos(angle1) * dist2;
        y = Math.sin(angle1) * dist2;
        z = Math.sin(angle2) * dist2;

        let [dcrx, dcry, dcrz] = [radToDeg(crx), radToDeg(cry), radToDeg(crz)];
        rz += dcrz;
        rx += dcrx;
        ry += dcry;

        let matrix = Matrix.create(x, y, z, rx, ry, rz);
        return matrix;
    }
}