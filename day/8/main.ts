const input = await Deno.readTextFile("day/8/input.txt");
const W = input.indexOf("\n");
const height = input.split("\n").length;
const visible = new Set<number>();

console.log(W, height);
const grid = input.split("").filter(c => "0123456789".includes(c)).map(Number);
const scores = Array.from({length: 4}, ()=>new Int32Array(W*height));

console.log("->", "<-", "v", "^");
for (let y = 0; y < height; y++) {
    for (let x = 0, h = -1, s = new Uint32Array(10).fill(0); x < W; x++) {
        const i = x + y * W;
        const z = grid[i];
        if (z > h) {
            h = z;
            visible.add(x + y * 0x1_0000);
        }
        scores[0][i] = x - s[z];
        for (let n = 0; n <= z; n++) {
            s[n] = x;
        }
    }
    for (let x = W-1, h = -1, s = new Uint32Array(10).fill(W-1); x >= 0 ; x--) {
        const i = x + y * W;
        const z = grid[i];
        if (z > h) {
            h = z;
            visible.add(x + y * 0x1_0000);
        }
        scores[1][i] = s[z] - x;
        for (let n = 0; n <= z; n++) {
            s[n] = x;
        }
    }
}
for (let x = 0; x < W; x++) {
    for (let y = 0, h = -1, s = new Uint32Array(10).fill(0); y < height; y++) {
        const i = x + y * W;
        const z = grid[i];
        if (z > h) {
            h = z;
            visible.add(x + y * 0x1_0000);
        }
        scores[2][i] = y - s[z];
        for (let n = 0; n <= z; n++) {
            s[n] = y ;
        }
    }
    for (let y = height-1, h = -1, s = new Uint32Array(10).fill(height-1); y >= 0 ; y--) {
        const i = x + y * W;
        const z = grid[i];
        if (z > h) {
            h = z;
            visible.add(x + y * 0x1_0000);
        }
        scores[3][i] = s[z] - y;
        for (let n = 0; n <= z; n++) {
            s[n] = y;
        }
    }
}

console.log(visible.size);


let max = 0;
for (let i = 0; i < W*height; i++) {
    const score = scores.map(a => a[i]).reduce((a,b)=>a*b, 1);
    max = Math.max(score, max);
}

console.log(max)