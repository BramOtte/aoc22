export {}
const input: string = await Deno.readTextFile("input5.txt");
`
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

function day(extra: boolean) {
    const [top, bot] = input.split("\n\n").map(line => line.replace("\r", ""));

    let stacks: string[][] = [];
    {
        const lines = top.split("\n").map(line => line.replace("\r", ""));
        const last = lines[lines.length-1];
        const indexes = last.split(/\s+/)
            .map(v => {
                return last.indexOf(v);
            }).slice(1, -1);
        for (const line of lines.slice(0,-1)) {
            if (!line) {
                continue
            }

            indexes.forEach((v, i) => {
                if (line[v] === " ") {
                    return
                }
                (stacks[i] ??= []).push(line[v]);
            })
        }
    }
    for (const stack of stacks) {
        stack.reverse();
    }


    const moves: [number, number, number][] = [];
    for (const line of bot.split("\n")) {
        if (!line) {
            continue;
        }
        const [move, count, from, i, to, j] = line.split(/\s+/);
        moves.push([Number(count), Number(i) - 1, Number(j) - 1]);
    }

    for (const [count, from, to] of moves) {
        if (extra) {

            stacks[to].push(...stacks[from].slice(-count));
            stacks[from].length -= count;
        } else {
            for (let i = 0; i < count; i++) {
                stacks[to].push(stacks[from].pop() as any);
            }
        }
    }
    return stacks.map(v => v[v.length-1]).join("");
}

console.log(day(false))
console.log(day(true))