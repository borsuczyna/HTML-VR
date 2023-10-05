export default class Maths {
    static distance2D(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    static distance3D(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
    }

    static radToDeg(rad: number): number {
        return rad * 180 / Math.PI;
    }

    static degToRad(deg: number): number {
        return deg * Math.PI / 180;
    }

    static angleDifference(a: number, b: number): number {
        return Math.atan2(Math.sin(a - b), Math.cos(a - b));
    }
}