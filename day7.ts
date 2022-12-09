const input = Deno.readTextFileSync("day7.txt");
class Dir {
    files: Record<string, number | Dir> = {}

    constructor(public parent?: Dir){
    }
    get root(): Dir {
        return this.parent?.root ?? this; 
    }
    #size?: number;
    get size() {
        if (this.#size !== undefined) {
            return this.#size;
        }
        let size = 0;
        for (const file of Object.values(this.files)) {
            size += file instanceof Dir ? file.size : file;
        }
        this.#size = size;
        return size;
    }
    walk_dirs(cb: (dir: Dir) => void) {
        cb(this);
        for (const dir of Object.values(this.files)) {
            if (dir instanceof Dir) {
                dir.walk_dirs(cb);
            }
        }
    }
}

const root = new Dir();
let current = root;

for (const line of input.split("\n")) {
    if (line.startsWith("$ cd")) {
        const [_1, _2, name] = line.split(" ");
        if (name === "/") {
            current = root
            continue;
        }
        for (const part of name.split("/")) {
            if (part === "..") {
                current = current.parent ?? root;
            } else {
                current = (current.files[part] ??= new Dir(current)) as Dir;
            }
        }
    } else if ("0123456789".includes(line[0])) {
        const [size, name] = line.split(" ");
        current.files[name] = Number(size);
    } else if (line.startsWith("dir")) {
        const name = line.split(" ")[1];
        current.files[name] ??= new Dir(current);
    }
}

let dirs: Dir[] = [];
let sum = 0;
const max_size = 100000;
root.walk_dirs(dir => dirs.push(dir));
dirs.forEach(dir => {if (dir.size <= max_size) {sum += dir.size}})
// console.log(root);
// console.log(dirs);
console.log(sum);

const total_space = 70000000;
const needed_space = 30000000;

const to_free = needed_space - (total_space - root.size);

const sorted =dirs.filter(dir => dir.size >= to_free).sort((a,b) => a.size - b.size);
console.log(to_free)
console.log(sorted[0].size)