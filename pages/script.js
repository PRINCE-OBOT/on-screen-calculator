function add(num1, num2){
    let result  = num1 + num2
    return result 
}

function sub(num1, num2){
    let result = num1 - num2
    return result
}

function mul(num1, num2){
    let result = num1 * num2
    return result
}

function div(num1, num2){
    let result = num1 / num2
    return result
}

// console.log(sub(8, 6))
// console.log(mul(4, 2))
// console.log(div(9, 6))

function operate(operator, num1, num2){
    console.log(add(num1, num2))
}
operate('+', 5, 7)
