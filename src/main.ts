import './style.css'

import Engine from "./engine/main";
import Window from "./engine/window/window";
import Camera from './camera/camera';

window.addEventListener('wheel', (e) => {
    Camera.fov += e.deltaY / 100;
});

let engine = new Engine();
let windowElement = new Window()
    .setSource(`
        <div id="test">test</div>
        <style>
            #test {
                width: 300px;
                height: 300px;
                background: red;
                font-size: 100px;
            }
        </style>
    `)
    .setPosition([0, 0, 10])
    .setSize([300, 300])
    .setRotation([0, 0, 0]);

engine.addWindow(windowElement);

windowElement = new Window()
    .setSource(`
    <div id="test2">
    <iframe width="1920" height="1080" style="border: none; border-radius: 2rem;"
    src="https://www.youtube.com/embed/bPWO3eWbjzM">
    </iframe>
    </div>

    <style>
        #test2 {
            width: 1920px;
            height: 1080px;
            background: rgba(255, 255, 255, 0.2);
            font-size: 100px;
            padding: 2rem;
            border-radius: 2rem;
        }
    `)
    .setPosition([0, -4, 11])
    .setSize([1920, 1080])
    .setRotation([30, 0, 0]);

engine.addWindow(windowElement);

windowElement = new Window()
    .setSource(`
    <div id="test2">
    <iframe width="1920" height="1080" style="border: none; border-radius: 2rem;"
    src="https://www.youtube.com/embed/CKWXtfB5NTM">
    </iframe>
    </div>

    <style>
        #test2 {
            width: 1920px;
            height: 1080px;
            background: rgba(255, 255, 255, 0.2);
            font-size: 100px;
            padding: 2rem;
            border-radius: 2rem;
        }
    `)
    .setPosition([0, 6, 11])
    .setSize([1920, 1080])
    .setRotation([-50, 0, 0]);

engine.addWindow(windowElement);

function updateTest() {
    requestAnimationFrame(updateTest);

    windowElement.rotation[1] += 0.1;
}

requestAnimationFrame(updateTest);

// on scroll change Camera.fov