import { Device, DeviceManager } from './Devices/deviceManager';
import Rendering from './Rendering/main';
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

    update() {
        requestAnimationFrame(this.update.bind(this));

        this.windows.forEach(window => {
            let matrix = Rendering.getWindowMatrix(window);
            window.updateMatrix(matrix);

            window.render();
        });
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