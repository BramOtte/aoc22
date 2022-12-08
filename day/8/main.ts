// const input = await Deno.readTextFile("day/8/input.txt");
const input = await Deno.readTextFile("day/8/example.txt");
const W = input.indexOf("\n");
const height = input.split("\n").length;
const visible = new Set<number>();

console.log(W, height);
const grid = input.split("").filter(c => "0123456789".includes(c)).map(Number);
const scores = Array.from({length: 4}, ()=>new Uint32Array(W*height));


for (let y = 0; y < height; y++) {
    for (let x = 0, h = -1, o = 0, s = 0; x < W; x++, s++) {
        const i = x + y * W;
        const z = grid[i];
        if (z > h) {
            h = z;
            visible.add(x + y * 0x1_0000);
        }
        scores[0][i] = s;
        if (z > o) {
            s = 0;
        }
        o = z;
    }
    for (let x = W-1, h = -1; x >= 0 ; x--) {
        const z = grid[x + y * W];
        if (z > h) {
            h = z;
            visible.add(x + y * 0x1_0000);
        }
    }
}
for (let x = 0; x < W; x++) {
    for (let y = 0, h = -1; y < height; y++) {
        const z = grid[x + y * W];
        if (z > h) {
            h = z;
            visible.add(x + y * 0x1_0000);
        }
    }
    for (let y = height-1, h = -1; y >= 0 ; y--) {
        const z = grid[x + y * W];
        if (z > h) {
            h = z;
            visible.add(x + y * 0x1_0000);
        }
    }
}

console.log(visible.size);


let max = 0;
for (let i = 0; i < W*height; i++) {
    const score = scores.map(a => a[i]).reduce((a,b)=>a*b, 0);
    max = Math.max(score, max);
}

console.log(max)