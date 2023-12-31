import Window from "./window/window";
import { Device, DeviceManager } from "./devices/deviceManager";
import { Transform } from "../rendering/transform";
import Camera from "../camera/camera";
import { vec2 } from "gl-matrix";
import CameraDesktopController from "../camera/desktopController";
import CameraMobileController from "../camera/mobileController";
import EventManager from "../event/main";

export default class Engine {
    private app: HTMLElement = document.getElementById('app')!;
    private windows: Window[] = [];

    constructor() {
        if(DeviceManager.device != Device.Desktop) {
            document.addEventListener('click', () => {
                this.app.requestFullscreen();
            });

            new CameraMobileController();
        } else {
            new CameraDesktopController();
        }

        requestAnimationFrame(this.update.bind(this));
    }

    addWindow(window: Window) {
        this.windows.push(window);
        this.app.appendChild(window.html);
    }

    update() {
        requestAnimationFrame(this.update.bind(this));

        EventManager.triggerEvent('onClientPreRender', Engine);
        
        this.windows.forEach(window => {
            const borders = window.bordersPositions;
            const screenPoints = borders.map(border => Camera.worldToScreen(border));
            
            // if any screenPoints[2] < 0, then the window is behind the camera
            if(screenPoints[2][2] < 0) {
                window.html.style.display = 'none';
                return;
            } else {
                window.html.style.display = 'block';
            }

            let transform = Transform.getElementTransform(window.html, [
                screenPoints[1] as unknown as vec2,
                screenPoints[3] as unknown as vec2,
                screenPoints[2] as unknown as vec2,
                screenPoints[0] as unknown as vec2
            ], [window.width, window.height]);

            let depth = window.depth;

            window.html.style.transform = `
                matrix3d(
                    ${transform[0][0]}, ${transform[1][0]}, ${transform[2][0]}, ${transform[3][0]},
                    ${transform[0][1]}, ${transform[1][1]}, ${transform[2][1]}, ${transform[3][1]},
                    ${transform[0][2]}, ${transform[1][2]}, ${transform[2][2]}, ${transform[3][2]},
                    ${transform[0][3]}, ${transform[1][3]}, ${transform[2][3]}, ${transform[3][3]}
                )`
            window.html.style.transformOrigin = '0 0';
            window.html.style.zIndex = Math.floor(100000 - depth).toString();
        });
    }
}