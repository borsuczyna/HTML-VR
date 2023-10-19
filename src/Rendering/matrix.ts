import { mat4, quat, vec3 } from 'gl-matrix';

export function generate(position: vec3, rotation: vec3): mat4 {
    if (
        position.length !== 3 ||
        rotation.length !== 3 ||
        isNaN(rotation[0]) ||
        isNaN(rotation[1]) ||
        isNaN(rotation[2])
    ) {
        return mat4.create();
    }

    const [x, y, z] = position;
    const [rX, rY, rZ] = rotation;

    const toRadians = (degrees: number) => (Math.PI * degrees) / 180;

    const radRX = toRadians(rX);
    const radRY = toRadians(rY);
    const radRZ = toRadians(rZ);

    return [
        Math.cos(radRZ) * Math.cos(radRY) - Math.sin(radRZ) * Math.sin(radRX) * Math.sin(radRY),
        Math.cos(radRY) * Math.sin(radRZ) + Math.cos(radRZ) * Math.sin(radRX) * Math.sin(radRY),
        -Math.cos(radRX) * Math.sin(radRY),
        0,
        
        -Math.cos(radRX) * Math.sin(radRZ),
        Math.cos(radRZ) * Math.cos(radRX),
        Math.sin(radRX),
        0,

        Math.cos(radRZ) * Math.sin(radRY) + Math.cos(radRY) * Math.sin(radRZ) * Math.sin(radRX),
        Math.sin(radRZ) * Math.sin(radRY) - Math.cos(radRZ) * Math.cos(radRY) * Math.sin(radRX),
        Math.cos(radRX) * Math.cos(radRY),
        0,

        x, y, z, 1,
    ];
}

export function getOffset(position: vec3, rotation: vec3, offset: vec3): vec3 {
    const mat = generate(position, rotation);

    const vec = vec3.create();
    vec3.transformMat4(vec, offset, mat);

    return vec;
}

export function getOffsetFromMatrix(matrix: mat4, offset: vec3): vec3 {
    const vec = vec3.create();
    vec3.transformMat4(vec, offset, matrix);

    return vec;
}