const digitOperatorContainer = document.querySelector(
  ".digit-operator-container"
);
const inp = document.querySelector("input");

//Stores the operation from the calculation
let saveDigit = {};

function add(num1, num2) {
  let result = num1 + num2;
  return result;
}

function sub(num1, num2) {
  let result = num1 - num2;
  return result;
}

function mul(num1, num2) {
  let result = num1 * num2;
  return result;
}

function div(num1, num2) {
  let result = num1 / num2;
  return result;
}

digitOperatorContainer.addEventListener("click", (e) => {
  let clickedDigit = e.target.textContent;
  let splitDigit = "0123456789".split("");
  let splitOperators = "+-*/".split("");

  // Checks if operator exist in the saveDigit object adding the secondNum in the saveDigit oject && accepts only digits.
  if (saveDigit["operator"] && splitDigit.includes(clickedDigit)) {
    //Checks if the secondNum key exists, if it does not exist it clears the inp screen for the secondNum value to be entered..
    if (!saveDigit["secondNum"]) inp.value = "";
    inp.value += clickedDigit;
    saveDigit["secondNum"] = inp.value;
    //Accepts only digit
  } else if (splitDigit.includes(clickedDigit)) {
    inp.value += clickedDigit;
    saveDigit["firstNum"] = inp.value;
    //Checks if the firstNum is provided before it is been added to the saveDigit object.
  } else if (saveDigit["firstNum"] && splitOperators.includes(clickedDigit)) {
    saveDigit["operator"] = clickedDigit;
    //Passes the values inside the saveDigit object as argument.
  } else if (clickedDigit === "=") {
    operate(saveDigit.operator, +saveDigit.firstNum, +saveDigit.secondNum);
    //Clears the input screen and saveObject keys
  } else if (clickedDigit === "AC") {
    inp.value = "";
    for (let key in saveDigit) {
      delete saveDigit[key];
    }
  }
});

function operate(operator, num1, num2) {
  if (operator === "+") inp.value = add(num1, num2);
  else if (operator === "-") inp.value = sub(num1, num2);
  else if (operator === "*") inp.value = mul(num1, num2);
  else if (operator === "/") inp.value = div(num1, num2).toFixed(2);

  let updateFirstNum = inp.value
  for(let key in saveDigit){
    if(key === "firstNum") saveDigit["firstNum"] = updateFirstNum
    else {
      delete saveDigit[key]
    }
  }
}

console.log(saveDigit);
