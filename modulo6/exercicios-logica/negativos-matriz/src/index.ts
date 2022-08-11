function negativosMatriz (matriz: number[][]) {
    let contador = 0
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] < 0) {
                contador++
            }
        }
    }

    return contador
}

console.log(negativosMatriz([[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]));
console.log(negativosMatriz([[3,2],[1,0]]));
console.log(negativosMatriz([[1,-1],[-1,-1]]));
console.log(negativosMatriz([[-1]]));
