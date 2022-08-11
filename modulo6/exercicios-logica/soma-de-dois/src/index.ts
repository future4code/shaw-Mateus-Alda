function somaDeDois (arr: number[], target: number) {
    const complementares: number[] = []
    const result: number[] = []
    for (let i = 0; i < arr.length; i++) {
        const indiceComplemento = complementares.indexOf(arr[i])
        if (indiceComplemento < 0) {
            complementares.push(target - arr[i])
        } else {
            result.push(indiceComplemento)
            result.push(i)
            break
        }
    }

    return result
}

console.log(somaDeDois([2, 7, 11, 15], 9));
console.log(somaDeDois([4, 5, 10, 12, 21], 17));
