const digitOperatorContainer = document.querySelector(
  ".digit-operator-container"
);
const inp = document.querySelector("input");

//Stores each math element user click from the calculation
//Setting the stop key to true stop the firstNum from appending digit when the summarize value is use for another expression 
let storeMathElement = { stop : false};

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
  let mathElement = e.target.textContent;
  let splitDigit = "0123456789".split("");
  let splitOperators = "+-*/".split("");

  // Checks if operator exist in the saveDigit object adding the secondNum in the saveDigit oject && accepts only digits.
  if (storeMathElement["operator"] && splitDigit.includes(mathElement)) {
    //Checks if the secondNum key exists, if it does not exist it clears the inp screen for the secondNum value to be entered..
    if (!storeMathElement["secondNum"]) inp.value = "";
    inp.value += mathElement;
    storeMathElement["secondNum"] = inp.value;
    //Accepts only digit
  } else if (splitDigit.includes(mathElement)) {
    //Stop the summarize value to be appended to a number
      if(storeMathElement.stop){
        if(splitDigit.includes(mathElement)){
          inp.value = ""
          storeMathElement.stop = false
        }
      }
    inp.value += mathElement;
    storeMathElement["firstNum"] = inp.value;
    //Checks if the firstNum is provided before it is been added to the saveDigit object.
  } else if (storeMathElement["firstNum"] && splitOperators.includes(mathElement)) {
    storeMathElement["operator"] = mathElement;
    //Passes the values inside the saveDigit object as argument.
  } else if (mathElement === "=" && storeMathElement["secondNum"]) {
    operate(
      storeMathElement.operator,
      +storeMathElement.firstNum,
      +storeMathElement.secondNum
    );
    //Clears the input screen and saveObject keys
  } else if (mathElement === "AC") {
    inp.value = "";
    for (let key in storeMathElement) {
      delete storeMathElement[key];
    }
  }
});

function operate(operator, num1, num2) {
  if (operator === "+") inp.value = add(num1, num2);
  else if (operator === "-") inp.value = sub(num1, num2);
  else if (operator === "*") inp.value = mul(num1, num2);
  else if (operator === "/") inp.value = div(num1, num2).toFixed(2);

  let updateFirstNum = inp.value
  for (let key in storeMathElement) {
    if (key === "firstNum") storeMathElement[key] = updateFirstNum;
    else if(key === "stop") storeMathElement[key] = true
    else {
      delete storeMathElement[key];
    }
  }
}

console.log(storeMathElement);
