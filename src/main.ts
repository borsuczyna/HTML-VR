import './style.css'

import Engine from "./engine/main";
import Window from "./engine/window/window";
import Camera from './camera/camera';
import { generate, getOffsetFromMatrix } from './rendering/matrix';
import EventManager from './event/main';

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
                color: white;
            }
        </style>
    `)
    .setPosition([0, 0, 10])
    .setSize([300, 300])
    .setRotation([0, 0, 0]);

engine.addWindow(windowElement);

// windowElement = new Window()
//     .setSource(`
//     <div id="test2">
//     eluwina
//     </div>

//     <style>
//         #test2 {
//             width: 1920px;
//             height: 1080px;
//             background: rgba(255, 255, 255, 0.2);
//             font-size: 100px;
//             padding: 2rem;
//             border-radius: 2rem;
//         }
//     `)
//     .setPosition([0, -4, 11])
//     .setSize([1920, 1080])
//     .setRotation([30, 0, 0]);

// engine.addWindow(windowElement);

let windowElement2 = new Window()
    .setSource(`
    <div id="test2">
    
    </div>

    <style>
        #test2 {
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 1);
            font-size: 100px;
            padding: 2rem;
            border-radius: 2rem;
        }
    `)
    .setPosition([0, 6, 11])
    .setSize([50, 50])
    .setRotation([-50, 0, 0]);

engine.addWindow(windowElement2);

function updateTest() {
    windowElement.rotation[1] += 1;

    let matrix = generate(windowElement.position, windowElement.rotation);
    let offset = getOffsetFromMatrix(matrix, [0, 0, 1]);
    windowElement2.position = offset;
    windowElement2.rotation = windowElement.rotation;
}

EventManager.addEventHandler('onClientPreRender', Engine, updateTest);

// on scroll change Camera.fov