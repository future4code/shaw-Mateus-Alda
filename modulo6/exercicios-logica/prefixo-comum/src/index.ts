function prefixoComum (arr: string[]) {
    let result = ''
    let limite = Infinity
    for (let str of arr) {
        limite = Math.min(limite, str.length)
    }
    for (let i = 0; i < limite; i++) {
        const char = arr[0][i]
        let prefixoValido = true
        for (let str of arr) {
            if (str[i] !== char) {
                prefixoValido = false
            }
        }
        if (prefixoValido) {
            result = result + char
        } else {
            break
        }
    }

    return result
}

console.log(prefixoComum(["flower","flow","flight"]));
console.log(prefixoComum(["dog","racecar","car"]));
console.log(prefixoComum(["coracao","cor","corona","coreia"]));
