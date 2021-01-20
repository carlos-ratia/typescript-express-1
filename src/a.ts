const v1: number | null = 3;
const v2: number = 2;
let c = (a: number,b: number) => {
    if (a === null) {
        return b;
    }
    return a + b;
}

console.log(c(v1, v2));
throw new Error();