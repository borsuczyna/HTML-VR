export default class Accelerometer {
    public available: boolean = false;

    private yaw: number = 0;
    private pitch: number = 0;
    private roll: number = 0;

    constructor() {
        this.available = window.DeviceMotionEvent !== undefined;

        if (this.available) {
            window.addEventListener("deviceorientation", (event) => this.updateOrientation(event));
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
        return [this.yaw, this.pitch, this.roll];
    }
}

// -160 > -20
// -(-160 + 180) = -20