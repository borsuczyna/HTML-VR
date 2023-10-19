import { Device, DeviceManager } from "./deviceManager";

export default class Accelerometer {
    private static initialized: boolean = false;

    private static yaw: number = 0;
    private static pitch: number = 0;
    private static roll: number = 0;

    constructor() {
        if(Accelerometer.initialized) return;

        window.addEventListener("deviceorientation", (event) => this.updateOrientation(event));
        
        if(DeviceManager.device == Device.Desktop) {
            document.addEventListener('mousedown', (e) => this.manualControl(e, 'click'));
            document.addEventListener('mouseup', (e) => this.manualControl(e, 'release'));
            document.addEventListener('mousemove', (e) => this.manualControl(e, 'move'));
        }

        Accelerometer.initialized = true;
    }

    private updateOrientation(event: DeviceOrientationEvent) {
        let yaw = event.alpha || 0;
        let pitch = event.gamma || 0;
        let roll = event.beta || 0;

        if(pitch > 0) {
            roll = -roll + 180;
            yaw -= 180;
            pitch = 90 - pitch;
        } else {
            pitch = -90 - pitch;
        }

        pitch = -pitch;

        Accelerometer.yaw = yaw;
        Accelerometer.pitch = pitch;
        Accelerometer.roll = roll;
    }

    static get orientation(): [number, number, number] {
        if(DeviceManager.device == Device.Desktop) {
            return [Accelerometer.yaw, Accelerometer.pitch - 90, Accelerometer.roll];
        } else {
            return [Accelerometer.yaw, Accelerometer.pitch, Accelerometer.roll];
        }
    }

    // manual control for desktop
    private isMouseDown: boolean = false;

    private manualControl(e: MouseEvent, type: 'click' | 'release' | 'move') {
        if(type == 'click') {
            this.isMouseDown = true;
        } else if(type == 'release') {
            this.isMouseDown = false;
        }

        if(this.isMouseDown) {
            Accelerometer.yaw += e.movementX/10;
            Accelerometer.pitch -= e.movementY/10;
        }
    }
}

new Accelerometer();