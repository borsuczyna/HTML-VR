import Matrix, { MatrixData } from "../Rendering/matrix";

export default class Window {
    html: HTMLElement;
    x: number = 0;
    y: number = 0;
    z: number = 0;
    rx: number = 0;
    ry: number = 0;
    rz: number = 0;
    matrix: MatrixData = Matrix.create();

    constructor() {
        this.html = document.createElement('div');
        this.html.classList.add('window');
    }

    updateMatrix(matrix: MatrixData) {
        this.matrix = matrix;
        return this;
    }

    render() {
        let matrix = this.matrix;
        this.html.style.transform = `matrix3d(${matrix.join(',')})`;
    }

    setSource(source: string) {
        this.html.innerHTML = source;
        return this;
    }

    setPosition(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    setRotation(rx: number = 0, ry: number = 0, rz: number = 0) {
        this.rx = rx;
        this.ry = ry;
        this.rz = rz;
        return this;
    }
}