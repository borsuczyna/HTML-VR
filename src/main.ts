import Accelerometer from './Devices/accelerometer';
import { Device, DeviceManager } from './Devices/deviceManager';
import Camera from './Rendering/camera';
import { angleDifference, degToRad, distance2D, distance3D, radToDeg } from './Rendering/math';
import Matrix from './Rendering/matrix';
import Window from './Window/main';
import './style.css';

class Engine {
    app: HTMLElement;
    
    windows: Window[] = [];

    constructor() {
        this.app = document.getElementById('app')!;
        
        if(DeviceManager.getDevice() != Device.Desktop) {
            document.addEventListener('click', () => {
                this.app.requestFullscreen();
            });
        }

        requestAnimationFrame(this.update.bind(this));
    }

    addWindow(window: Window) {
        this.windows.push(window);
        this.app.appendChild(window.html);
    }

    getWindowMatrix(window: Window) {
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

    update() {
        requestAnimationFrame(this.update.bind(this));

        this.windows.forEach(window => {
            let matrix = this.getWindowMatrix(window);
            window.updateMatrix(matrix);

            window.render();
        });

        // this.windows[0]!.setRotation(Math.sin(Date.now() / 1000) * 360, Math.sin(Date.now() / 1000) * 360, Math.sin(Date.now() / 1000) * 360);
        // this.camera.y = Math.sin(Date.now() / 1000) * 500;
        // this.camera.setRotation(0, 0, this.camera.rz + 0.001);
    }
}

let engine = new Engine();
let window = new Window()
    .setSource(`
        <div style="background-color: rgba(255, 255, 255, 0.2); padding: 1rem; border-radius: 0.5rem;">
            Hello, world! ds dsajkhh djksab dhjsab hjdsahj<br>
            <br>
            borsuczyna test
            <br>
            <div class="test">
                hover test
            </div>

            <style>
                .test:hover {
                    background-color: blue;
                }
            </style>

            <input type="text" value="test">
        </div>
    `)
    .setPosition(0, 1000, 0)
    .setRotation(0, 0, 0);
engine.addWindow(window);