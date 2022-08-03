// 1.
function isOneEdit(firstString: string, secondString: string): boolean {
    if (Math.abs(firstString.length - secondString.length) > 1) {
        return false
    }
    if (firstString.length > secondString.length) {
        return firstString.slice(0, -1) === secondString
    }
    if (secondString.length > firstString.length) {
        return secondString.slice(0, -1) === firstString
    }
    let differentChar = 0
    for (let i = 0; i < firstString.length; i++) {
        if (firstString[i] !== secondString[i]) {
            differentChar++
        }
    }
    return differentChar === 1
}

console.log('isOneEdit ', isOneEdit('banana', 'banan'));
console.log('isOneEdit ', isOneEdit('banana', 'bananas'));
console.log('isOneEdit ', isOneEdit('banana', 'banani'));
console.log('isOneEdit ', isOneEdit('banana', 'bananis'));


// 2.
function compressString(input: string): string {
    let result = ''
    let count = 1
    let i = 1
    while (i < input.length) {
        if (input[i-1] === input[i]) {
            count++
        } else {
            result = result + input[i-1] + count
            count = 1
        }
        i++
    }
    result = result + input[i-1] + count

    return result.length > input.length ? input : result
}

console.log('compress ', compressString('aabbb'));
console.log('compress ', compressString('aabb'));
console.log('compress ', compressString('aab'));
