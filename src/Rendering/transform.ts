import { vec2 } from "gl-matrix";

declare var numeric: any;

if(typeof numeric === 'undefined') {
    console.log(`%cnumeric.js is not loaded
        %cAdd this line to your index.html:
        %c<script src="https://cdnjs.cloudflare.com/ajax/libs/numeric/1.2.6/numeric.min.js"></script>`,
        'color: red; font-weight: bold; font-size: 2rem; text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;',
        'color: #00aaff; font-size: 1rem;',
        'color: #569cd6; background-color: rgb(31, 31, 31); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 11px; line-height: 19px; white-space: pre;');

    alert('numeric.js is not loaded, see console for more info');
    throw new Error('numeric.js is not loaded');
}

export type TransformPosition = [
    vec2, vec2, vec2, vec2
];

export class Transform {
    static getElementTransform(element: HTMLElement, target: TransformPosition, dimensions?: [number, number]) {
        let from: TransformPosition = null as any as TransformPosition;
        
        if(!dimensions) {
            let dom: DOMRect = element.getBoundingClientRect();
            from = [
                [dom.left - dom.left, dom.top - dom.top],
                [dom.left - dom.left, dom.bottom - dom.top],
                [dom.right - dom.left, dom.bottom - dom.top],
                [dom.right - dom.left, dom.top - dom.top]
            ];
        } else {
            from = [
                [0, 0],
                [0, dimensions[1]],
                [dimensions[0], dimensions[1]],
                [dimensions[0], 0]
            ];
        }

        if(target.length !== 4) {
            throw new Error('Invalid target position');
        }

        let A = [];
        for(let i = 0; i < 4; i++) {
            A.push([from[i][0], from[i][1], 1, 0, 0, 0, -from[i][0] * target[i][0], -from[i][1] * target[i][0]]);
            A.push([0, 0, 0, from[i][0], from[i][1], 1, -from[i][0] * target[i][1], -from[i][1] * target[i][1]]);
        }

        let B = [];
        for(let i = 0; i < 4; i++) {
            B.push(target[i][0]);
            B.push(target[i][1]);
        }

        let h = numeric.solve(A, B);
        let H = [
            [h[0], h[1], 0, h[2]],
            [h[3], h[4], 0, h[5]],
            [0, 0, 1, 0],
            [h[6], h[7], 0, 1]
        ];

        return H;
    }
}