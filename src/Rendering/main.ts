import Accelerometer from "../Devices/accelerometer";
import Window from "../Window/main";
import Camera from "./camera";
import Maths from "./math";
import Matrix from "./matrix";

export default class Rendering {
    static getWindowMatrix(window: Window) {
        let [x, y, z] = [window.x, window.y, window.z];
        let [rx, ry, rz] = [window.rx, window.ry, window.rz];
        let [yaw, pitch, roll] = Accelerometer.orientation;
        
        let crx = Maths.angleDifference(0, Maths.degToRad(pitch));
        let cry = Maths.angleDifference(0, Maths.degToRad(roll));
        let crz = Maths.angleDifference(0, Maths.degToRad(yaw));
        
        Camera.setRotation(Maths.radToDeg(crz), Maths.radToDeg(crx), roll);
        [x, y, z] = Camera.projectToViewTranslation(x, y, z);
        
        rx += Maths.radToDeg(crx) * 1;
        ry += Maths.radToDeg(cry);
        rz += Maths.radToDeg(crz) * 1;

        document.getElementById("debug")!.innerHTML = `x: ${x.toFixed(2)} y: ${y.toFixed(2)} z: ${z.toFixed(2)}`;

        let matrix = Matrix.create(x, y, z, rx, ry, rz);
        return matrix;
    }
}