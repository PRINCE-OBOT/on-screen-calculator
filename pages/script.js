const digitOperatorContainer = document.querySelector(".digit-operator-container")
const inp = document.querySelector("input")


const saveDigit = {}
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

digitOperatorContainer.addEventListener("click", (e)=>{
  let clickedDigit = e.target.textContent;
  let digit = "0123456789";
  let operators = "+-*/";

  let splitDigit = digit.split("");
  let splitOperators = operators.split("");

  // Checks if operator has been provided before it is been added to the saveDigit object && accepts only digits.
  if (saveDigit["operator"] && splitDigit.includes(clickedDigit)) {
    //Checks if the secondNum key exists, if it does not exist it clears the inp screen for the secondNum value to be entered..
    if (!saveDigit["secondNum"]) inp.value = "";
    inp.value += clickedDigit;
    saveDigit["secondNum"] = +inp.value;
    //Accepts only digit
  } else if (splitDigit.includes(clickedDigit)) {
    inp.value += clickedDigit;
    saveDigit["firstNum"] = +inp.value;
    //Checks if the firstNum is provided before it is been added to the saveDigit object.
  } else if (saveDigit["firstNum"] && splitOperators.includes(clickedDigit)) {
    saveDigit["operator"] = clickedDigit;
    //Passes the values inside the saveDigit object as argument. 
  } else if (clickedDigit === "=") {
    operate(saveDigit.operator, saveDigit.firstNum, saveDigit.secondNum);
  }
})

function operate(operator, num1, num2){
    if(operator === '+')console.log(add(num1, num2))
    else if(operator === '-')console.log(sub(num1, num2))
    else if(operator === '*')console.log(mul(num1, num2))
    else if(operator === '/')console.log(div(num1, num2))
}

console.log(saveDigit)