function checaParenteses(str: string) {
    let output = true
    const parenteses = []
    for (let char of str) {
        if (char === '(' || char === '[' || char === '{') {
            parenteses.push(char)
        }
        if (char === ')' || char === ']' || char === '}') {
            let parenteseFechado = false
            for (let i = parenteses.length - 1; i >= 0; i--) {
                switch (char) {
                    case ')':
                        if (parenteses[i] === '(') {
                            parenteseFechado = true
                            parenteses.splice(i, 1)
                            i = -1
                        }
                        if (parenteses[i] === '[' || parenteses[i] === '{') {
                            output = false
                            i = -1
                        }
                        break
                    case ']':
                        if (parenteses[i] === '[') {
                            parenteseFechado = true
                            parenteses.splice(i, 1)
                            i = -1
                        }
                        if (parenteses[i] === '(' || parenteses[i] === '{') {
                            output = false
                            i = -1
                        }
                        break
                    case '}':
                        if (parenteses[i] === '{') {
                            parenteseFechado = true
                            parenteses.splice(i, 1)
                            i = -1
                        }
                        if (parenteses[i] === '[' || parenteses[i] === '(') {
                            output = false
                            i = -1
                        }
                        break

                }

            }
            if (!parenteseFechado) {
                output = false
            }
        }
    }
    if (parenteses.length) {
        output = false
    }
    return output
}

console.log(checaParenteses("()"));
console.log(checaParenteses("()[]{}"));
console.log(checaParenteses("(]"));
console.log(checaParenteses("([)]"));
console.log(checaParenteses("{[]}"));
