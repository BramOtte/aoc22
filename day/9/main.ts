export {}
const input = //await Deno.readTextFile("day/9/input.txt");
`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;
const part2 = false;

const dirs: Record<string, [number, number]> = {
    "U": [ 0, -1],
    "D": [ 0,  1],
    "L": [-1,  0],
    "R": [ 1,  0],
}

const {abs, sign} = Math;
const rope = Array.from({length: part2 ? 10 : 2}, () => [0, 0] as [number, number])
let x = 6;
let y = 6;
let tx = x;
let ty = y;
const pos = new Set([x + y * 0x1_0000]);

function draw() {
    const w = 12;
    const h = 12;
    const grid = (".".repeat(w) + "\n").repeat(h).split("");
    if (x == tx && y == ty) {
        grid[x + y * (w+1)] = "B";
    } else {
        grid[x + y * (w+1)] = "H";
        grid[tx + ty * (w+1)] = "T";

    }

    console.log(grid.join("") +  "-".repeat(w) + "\n");
}
// draw();

for (const [d, v] of input.split("\n").map(line => line.split(" "))) {
    const repeat = Number(v);
    const [dx, dy] = dirs[d];
    console.log(d, v);
    for (let i = 0; i < repeat; i++) {
        x += dx;
        y += dy;
        const ex = x - tx, ey = y - ty;
        if (abs(ex) + abs(ey) > 2) {
            tx += sign(ex);
            ty += sign(ey);
        } else
        if (abs(ex) > 1) {
            tx += sign(ex);
        } else
        if (abs(ey) > 1) {
            ty += sign(ey);
        }
        

        pos.add(tx + ty * 0x1_0000);
        // draw();
    }
}

console.log(pos.size);