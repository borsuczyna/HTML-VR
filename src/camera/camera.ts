import { mat4, vec2, vec3 } from "gl-matrix";

export default class Camera {
    private static _x: number = 0;
    private static _y: number = 0;
    private static _z: number = 0;
    private static _yaw: number = 0;
    private static _pitch: number = 0;
    private static _roll: number = 0;

    static _nearClipDistance: number = 0.1;
    static _farClipDistance: number = 100.0;
    static _fov: number = 60;

    static projectionMatrix: mat4 = mat4.create();
    static worldViewMatrix: mat4 = mat4.create();

    // Initialize the camera
    constructor() {
        Camera.updateProjectionMatrix();
        window.addEventListener('resize', Camera.updateProjectionMatrix);
    }

    // Update the metrics of the camera
    private static updateProjectionMatrix() {
        const [width, height] = [window.innerWidth, window.innerHeight];
        mat4.perspective(Camera.projectionMatrix, (this._fov * Math.PI) / 180, width / height, Camera.nearClipDistance, Camera.farClipDistance);
    }

    private static updateWorldViewMatrix() {
        mat4.identity(Camera.worldViewMatrix);
        mat4.rotateY(Camera.worldViewMatrix, Camera.worldViewMatrix, Camera.yaw);
        mat4.rotateX(Camera.worldViewMatrix, Camera.worldViewMatrix, Camera.pitch);
        mat4.rotateZ(Camera.worldViewMatrix, Camera.worldViewMatrix, Camera.roll);
    }

    // Static methods
    static setPosition(x: number, y: number, z: number) {
        Camera._x = x;
        Camera._y = y;
        Camera._z = z;

        Camera.updateWorldViewMatrix();
    }

    static setRotation(yaw: number, pitch: number, roll: number) {
        Camera._yaw = yaw;
        Camera._pitch = pitch;
        Camera._roll = roll;

        Camera.updateWorldViewMatrix();
    }

    // Static getters and setters
    static get position(): vec3 {
        return vec3.fromValues(Camera._x, Camera._y, Camera._z);
    }

    static get rotation(): vec3 {
        return vec3.fromValues(Camera._yaw, Camera._pitch, Camera._roll);
    }

    static get yaw(): number {
        return Camera._yaw;
    }

    static get pitch(): number {
        return Camera._pitch;
    }

    static get roll(): number {
        return Camera._roll;
    }

    static get nearClipDistance(): number {
        return Camera._nearClipDistance;
    }

    static get farClipDistance(): number {
        return Camera._farClipDistance;
    }

    static set yaw(yaw: number) {
        Camera._yaw = yaw;
        Camera.updateWorldViewMatrix();
    }

    static set pitch(pitch: number) {
        Camera._pitch = pitch;
        Camera.updateWorldViewMatrix();
    }

    static set roll(roll: number) {
        Camera._roll = roll;
        Camera.updateWorldViewMatrix();
    }

    static set nearClipDistance(nearClipDistance: number) {
        Camera._nearClipDistance = nearClipDistance;
        Camera.updateProjectionMatrix();
    }

    static set farClipDistance(farClipDistance: number) {
        Camera._farClipDistance = farClipDistance;
        Camera.updateProjectionMatrix();
    }

    static set fov(fov: number) {
        Camera._fov = fov;
        Camera.updateProjectionMatrix();
    }

    static get fov(): number {
        return Camera._fov;
    }

    static set position(position: vec3) {
        Camera.setPosition(position[0], position[1], position[2]);
    }

    static set rotation(rotation: vec3) {
        Camera.setRotation(rotation[0], rotation[1], rotation[2]);
    }

    // Get the screen coordinates of a point in world space
    static worldToScreen(position: vec3): vec2 {
        const modelViewMatrix = mat4.create();
        const viewMatrix = mat4.create();
        const screenMatrix = mat4.create();
        const [width, height] = [window.innerWidth, window.innerHeight];
    
        // Calculate the model-view matrix
        mat4.translate(modelViewMatrix, modelViewMatrix, Camera.position);
        mat4.rotateY(modelViewMatrix, modelViewMatrix, Camera.yaw);
        mat4.rotateX(modelViewMatrix, modelViewMatrix, Camera.pitch);
        mat4.rotateZ(modelViewMatrix, modelViewMatrix, Camera.roll);
    
        // Calculate the view matrix (inverse of model-view matrix)
        mat4.invert(viewMatrix, modelViewMatrix);
    
        // Calculate the world-view matrix (view matrix without translation)
        mat4.identity(Camera.worldViewMatrix);
        mat4.rotateY(Camera.worldViewMatrix, Camera.worldViewMatrix, Camera.yaw);
        mat4.rotateX(Camera.worldViewMatrix, Camera.worldViewMatrix, Camera.pitch);
        mat4.rotateZ(Camera.worldViewMatrix, Camera.worldViewMatrix, Camera.roll);
    
        // Calculate the screen matrix (projection * view matrix)
        mat4.mul(screenMatrix, Camera.projectionMatrix, viewMatrix);
    
        // Transform the pointPosition to screen coordinates
        const screenPosition = vec3.create();
        vec3.transformMat4(screenPosition, position, screenMatrix);
    
        // Normalize the screen position
        const normalizedX = (screenPosition[0] + 1) * 0.5 * width;
        const normalizedY = (1 - (screenPosition[1] + 1) * 0.5) * height;
    
        return [normalizedX, normalizedY];
    }
}

new Camera();