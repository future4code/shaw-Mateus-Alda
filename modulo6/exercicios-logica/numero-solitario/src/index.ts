function numeroSolitario (arr: number[]) {
    const numeros: number[] = []
    for (let num of arr) {
        const i = numeros.indexOf(num)
        if (i < 0) {
            numeros.push(num)
        } else {
            numeros.splice(i, 1)
        }
    }

    return numeros[0]
}

console.log(numeroSolitario([2,2,1]));
console.log(numeroSolitario([4,1,2,1,2]));
