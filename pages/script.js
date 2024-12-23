const digitOperatorContainer = document.querySelector(
  ".digit-operator-container"
);
const inp = document.querySelector(".displayExpression");
const liveDisplay = document.querySelector(".liveDisplay")

//Stores each math element user click from the calculation
//Setting the stop key to true stop the firstNum from appending digit when the summarize value is use for another expression
let storeMathElement = { stop: false};

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

  // Checks if operator exist in the storeMathElement object before adding the secondNum in the storeMathElement oject && accepts only digits.
  if (storeMathElement["operator"] && splitDigit.includes(mathElement)) {
    //Checks if the secondNum key exists, if it does not exist it clears the inp screen for the secondNum value to be entered..
    if (!storeMathElement["secondNum"]) inp.value = "";
    inp.value += mathElement;
    //Add the secondNum if the operator exist in the storeMathElement object
    storeMathElement["secondNum"] = inp.value;
    //Accepts only digit
  } else if (splitDigit.includes(mathElement)) {
    //Stops the summarize value to be appended to a number
    if (storeMathElement.stop) {
      if (splitDigit.includes(mathElement)) {
        inp.value = "";
        storeMathElement.stop = false;
      }
    }
    inp.value += mathElement;
    // Add the firstNum
    storeMathElement["firstNum"] = inp.value;
  } 
    //Allows operator to provide the evaluation of the previous expression
    else if (
    storeMathElement["firstNum"] &&
    storeMathElement["secondNum"] &&
    splitOperators.includes(mathElement)
  ) {
    liveDisplayFunc()
    operate(
      storeMathElement.operator,
      +storeMathElement.firstNum,
      +storeMathElement.secondNum
    );
    storeMathElement["operator"] = mathElement;
  }
  //Checks if the firstNum exist in the storeMathElement object before the operator is been added to the storeMathElement object.
  else if (
    storeMathElement["firstNum"] &&
    splitOperators.includes(mathElement)
  ) {
    //Add the operator if the firstNum exist in the storeMathElement object
    storeMathElement["operator"] = mathElement;
    //Passes the values inside the storeMathElement as argument to operate().
  } else if (mathElement === "=" && storeMathElement["secondNum"]) {
    liveDisplayFunc()
    operate(
      storeMathElement.operator,
      +storeMathElement.firstNum,
      +storeMathElement.secondNum
    );
    //Clears the input screen, also clear the storeMathElement object, and ensure that stop key remains in the storeMathElement object 
  } else if (mathElement === "AC") {
    inp.value = "";
    for (let key in storeMathElement) {
      if(key === "stop"){
        storeMathElement[key] = true
      }
      else{
      delete storeMathElement[key];
      }
    }
  }
});

function operate(operator, num1, num2) {
  if (operator === "+") inp.value = add(num1, num2);
  else if (operator === "-") inp.value = sub(num1, num2);
  else if (operator === "*") inp.value = mul(num1, num2);
  else if (operator === "/"){if(!Number.isInteger(div(num1, num2))) inp.value = div(num1, num2).toFixed(2); else { inp.value = div(num1, num2)}};

  let updateFirstNum = inp.value;
  for (let key in storeMathElement) {
    if (key === "firstNum") storeMathElement[key] = updateFirstNum;
    else if (key === "stop") storeMathElement[key] = true;
    else {
      delete storeMathElement[key];
    }
  }
}

function liveDisplayFunc(){
   liveDisplay.textContent = `${storeMathElement.firstNum} ${storeMathElement.operator} ${storeMathElement.secondNum}`;
   
   animateLiveDisplay(storeMathElement.firstNum, storeMathElement.secondNum)
}

function animateLiveDisplay(num1, num2){
  let len1= +num1.length
  let len2= +num2.length
  
  //Calculate the length of the numbers and apply it to it keyframes so as to provide adequate visibility for longer numbers
  let lenTotal = parseInt((len1 + len2) / 1.5)
  
  
  const style = document.createElement('style')
   style.textContent = `@keyframes scrolltext{
  50%{transform : translateX(0)}
  100%{transform: translateX(-${lenTotal}rem)};
}`
document.body.appendChild(style)
}

//View how the code is executed
console.log(storeMathElement);
