import Camera from "./camera";

export default class CameraDesktopController {
    private static cx: number = 0;
    private static cy: number = 0;
    private static cursorDown: boolean = false;

    constructor() {
        document.addEventListener('mousedown', (e) => CameraDesktopController.onMouseDown(e));
        document.addEventListener('mouseup', (e) => CameraDesktopController.onMouseUp(e));
        document.addEventListener('mousemove', (e) => CameraDesktopController.onMouseMove(e));
    }

    private static onMouseDown(e: MouseEvent) {
        CameraDesktopController.cursorDown = true;
    }

    private static onMouseUp(e: MouseEvent) {
        CameraDesktopController.cursorDown = false;
    }

    private static onMouseMove(e: MouseEvent) {
        if(CameraDesktopController.cursorDown) {
            Camera.yaw += (e.clientX - CameraDesktopController.cx) * 0.001;
            Camera.pitch += (e.clientY - CameraDesktopController.cy) * 0.001;
        }

        CameraDesktopController.cx = e.clientX;
        CameraDesktopController.cy = e.clientY;
    }
}