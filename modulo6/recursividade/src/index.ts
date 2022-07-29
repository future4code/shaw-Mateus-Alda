function integerAsc(n: number): void {
    if (n >= 0) {
        integerAsc(n - 1)
        console.log(n);        
    }
}

console.log('integerAsc');
integerAsc(4)

function integerDesc(n: number): void {
    if (n >= 0) {
        console.log(n);
        integerDesc(n - 1)
    }
}

console.log('integerDesc');
integerDesc(5)

function integerSum(n: number, sum: number = 0): number {
    if (n === 0) {
        return sum
    }
    return integerSum (n - 1, sum + n)
}
console.log(integerSum(4));


function iterationSum(n: number) {
    let sum = 0
    for (let i = n; i > 0; i--) {
        sum += i
    }
    return sum
}
console.log(iterationSum(5));


function printArray (arr: number[], i: number = 0) {
    if (i < arr.length) {
        console.log(arr[i]);
        printArray(arr, i + 1)
    }
}
printArray([1,2,3,4,6])