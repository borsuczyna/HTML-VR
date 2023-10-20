import Accelerometer from "../engine/devices/accelerometer";
import Camera from "./camera";

export default class CameraMobileController {
    private static cx: number = 0;
    private static cy: number = 0;
    private static cursorDown: boolean = false;

    constructor() {
        document.addEventListener('touchstart', (e) => CameraMobileController.onMouseDown(e));
        document.addEventListener('touchend', () => CameraMobileController.onMouseUp());
        document.addEventListener('touchmove', (e) => CameraMobileController.onMouseMove(e));
        requestAnimationFrame(CameraMobileController.updateMobileController);
    }

    private static updateMobileController() {
        requestAnimationFrame(CameraMobileController.updateMobileController);

        let [yaw, pitch, roll] = Accelerometer.orientation;
        yaw = yaw * Math.PI / 180;
        pitch = -pitch * Math.PI / 180;
        roll = -roll * Math.PI / 180;
        Camera.setRotation(yaw, pitch, roll);
    }

    private static onMouseDown(e: TouchEvent) {
        CameraMobileController.cursorDown = true;
        CameraMobileController.cx = e.touches[0].clientX;
        CameraMobileController.cy = e.touches[0].clientY;
    }

    private static onMouseUp() {
        CameraMobileController.cursorDown = false;
    }

    private static onMouseMove(e: TouchEvent) {
        if(CameraMobileController.cursorDown) {
            Camera.yaw += (e.touches[0].clientX - CameraMobileController.cx) * 0.004;
            Camera.pitch += (e.touches[0].clientY - CameraMobileController.cy) * 0.004;
        }

        CameraMobileController.cx = e.touches[0].clientX;
        CameraMobileController.cy = e.touches[0].clientY;
    }
}