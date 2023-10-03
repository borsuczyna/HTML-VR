export function distance2D(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export function distance3D(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
}

export function radToDeg(rad: number): number {
    return rad * 180 / Math.PI;
}

export function degToRad(deg: number): number {
    return deg * Math.PI / 180;
}

export function angleDifference(a: number, b: number): number {
    return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}