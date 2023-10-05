import { Device, DeviceManager } from "./deviceManager";

export default class Accelerometer {
    public available: boolean = false;

    private yaw: number = 0;
    private pitch: number = 0;
    private roll: number = 0;

    private deviceManager: DeviceManager = new DeviceManager();

    constructor() {
        this.available = window.DeviceOrientationEvent !== undefined;

        window.addEventListener("deviceorientation", (event) => this.updateOrientation(event));
        
        if(this.deviceManager.device == Device.Desktop) {
            document.addEventListener('mousedown', (e) => this.manualControl(e, 'click'));
            document.addEventListener('mouseup', (e) => this.manualControl(e, 'release'));
            document.addEventListener('mousemove', (e) => this.manualControl(e, 'move'));
        }
    }

    private updateOrientation(event: DeviceOrientationEvent) {
        let yaw = event.alpha || 0;
        let pitch = event.gamma || 0;
        let roll = event.beta || 0;

        this.yaw = yaw;
        this.pitch = pitch;
        this.roll = roll;

        if(this.pitch > 0) {
            this.roll = -this.roll + 180;
            this.yaw -= 180;
            this.pitch = 90 - this.pitch;
        } else {
            this.pitch = -90 - this.pitch;
        }

        this.pitch = -this.pitch;
    }

    get orientation(): [number, number, number] {
        if(this.deviceManager.device == Device.Desktop) {
            return [this.yaw, this.pitch - 90, this.roll];
        } else {
            return [this.yaw, this.pitch, this.roll];
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
            this.yaw += e.movementX/10;
            this.pitch -= e.movementY/10;
        }
    }
}