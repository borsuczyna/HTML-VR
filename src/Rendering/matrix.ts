export type MatrixData = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number
];

export default class Matrix {
    static create(
        x: number = 0,
        y: number = 0,
        z: number = 0,
        rx: number = 0,
        ry: number = 0,
        rz: number = 0
    ): MatrixData {
        rx = rx * Math.PI / 180;
        ry = ry * Math.PI / 180;
        rz = rz * Math.PI / 180;

        [rx, ry, rz] = [rx, rz, ry];

        return [
            Math.cos(rz) * Math.cos(ry) - Math.sin(rz) * Math.sin(rx) * Math.sin(ry), Math.cos(ry) * Math.sin(rz) + Math.cos(rz) * Math.sin(rx) * Math.sin(ry), -Math.cos(rx) * Math.sin(ry), 0,
            -Math.cos(rx) * Math.sin(rz), Math.cos(rz) * Math.cos(rx), Math.sin(rx), 0,
            Math.cos(rz) * Math.sin(ry) + Math.cos(ry) * Math.sin(rz) * Math.sin(rx), Math.sin(rz) * Math.sin(ry) - Math.cos(rz) * Math.cos(ry) * Math.sin(rx), Math.cos(rx) * Math.cos(ry), 0,
            x, z, 999 - y, 1
        ]
    }

    static multiplyMatrix(matrixA: MatrixData, matrixB: MatrixData): MatrixData {
        const result: MatrixData = [] as any as MatrixData;
    
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let sum = 0;
                for (let k = 0; k < 4; k++) {
                    sum += matrixA[i * 4 + k] * matrixB[k * 4 + j];
                }
                result.push(sum);
            }
        }
    
        return result;
    }
}