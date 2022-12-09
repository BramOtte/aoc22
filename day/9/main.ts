export {}
const input = await Deno.readTextFile("day/9/input.txt");
console.log(day9(input, false));
console.log(day9(input, true));


function day9(input: string, part2: boolean): number {
    const dirs: Record<string, [number, number]> = {
        "U": [ 0, -1],
        "D": [ 0,  1],
        "L": [-1,  0],
        "R": [ 1,  0],
    }

    const {abs, sign} = Math;
    const rope = Array.from({length: part2 ? 10 : 2}, () => [0, 0] as [number, number])
    const pos = new Set([0]);

    for (const [d, v] of input.split("\n").map(line => line.split(" "))) {
        const repeat = Number(v);
        const [dx, dy] = dirs[d];
        for (let i = 0; i < repeat; i++) {
            rope[0][0] += dx;
            rope[0][1] += dy;
            for (let i = 1; i < rope.length; i++) {
                const [x, y] = rope[i-1];
                let [tx, ty] = rope[i];
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
                rope[i][0] = tx;
                rope[i][1] = ty;
            }
            
            const [tx, ty] = rope[rope.length-1];
            pos.add(tx + ty * 0x1_0000);
        }
    }
    return pos.size;
}