import { vec2, vec3 } from "gl-matrix";
import * as matrix from "../../rendering/matrix";
import Camera from "../../camera/camera";

export default class Window {
    html: HTMLElement;
    position: vec3 = vec3.create();
    rotation: vec3 = vec3.create();
    dimensions: vec2 = vec2.create();

    constructor() {
        this.html = document.createElement('div');
        this.html.classList.add('window');
    }

    setSource(source: string) {
        this.html.innerHTML = source;
        return this;
    }

    setPosition(position: vec3) {
        this.position = position;
        return this;
    }
    
    setSize(dimensions: vec2) {
        this.dimensions = dimensions;
        return this;
    }

    setRotation(rotation: vec3) {
        this.rotation = rotation;
        return this;
    }

    get width(): number {
        return this.dimensions[0];
    }

    get height(): number {
        return this.dimensions[1];
    }

    get bordersPositions(): [vec3, vec3, vec3, vec3] {
        let m4 = matrix.generate(this.position, this.rotation);

        let [width, height] = [this.width / 200, this.height / 200];
        let topLeft = matrix.getOffsetFromMatrix(m4, [-width / 2, -height / 2, 0]);
        let topRight = matrix.getOffsetFromMatrix(m4, [width / 2, -height / 2, 0]);
        let bottomLeft = matrix.getOffsetFromMatrix(m4, [-width / 2, height / 2, 0]);
        let bottomRight = matrix.getOffsetFromMatrix(m4, [width / 2, height / 2, 0]);

        return [topLeft, topRight, bottomLeft, bottomRight];
    }

    get depth(): number {
        let distance = vec3.distance(this.position, Camera.position);
        return distance * 100;
    }
}