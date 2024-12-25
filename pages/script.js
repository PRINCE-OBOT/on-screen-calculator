const digitOperatorContainer = document.querySelector(
  ".digit-operator-container"
);
const inp = document.querySelector(".displayExpression");
const liveDisplay = document.querySelector(".liveDisplay");
const resetButton = document.querySelector(".resetButton");

//Stores each math element user click from the calculation
//Setting the stop key to true stop the firstNum from appending digit when the summarize value is use for another expression
let storeMathElement = { stop: false };
//Stores both number and period. From the array number is filtered and if there is period, just one is filtered to the filterPeriod array.
let storeNumPeriod = [];

//filters all numbers from storeNumPeriod array and just one period
let filterPeriod = [];

function add(num1, num2) {
  let result = num1 + num2;
  if (!Number.isInteger(result)) {
    return result.toFixed(2);
  } else {
    return result;
  }
}

function sub(num1, num2) {
  let result = num1 - num2;
  if (!Number.isInteger(result)) {
    return result.toFixed(2);
  } else {
    return result;
  }
}

function mul(num1, num2) {
  let result = num1 * num2;
  if (!Number.isInteger(result)) {
    return result.toFixed(2);
  } else {
    return result;
  }
}

function div(num1, num2) {
  let result = num1 / num2;
  if (result === Infinity) {
    return `Can't divide by 0`;
  } else if (!Number.isInteger(result)) {
    return result.toFixed(2);
  } else {
    return result;
  }
}

digitOperatorContainer.addEventListener("click", (e) => {
  let mathElement = e.target.textContent;
  let splitDigit = "0123456789.".split("");
  let splitOperators = "+-*/".split("");

  let inpValue = +inp.value;
  if (
    (mathElement === "+/-" &&
      storeMathElement["firstNum"] &&
      !storeMathElement["secondNum"] &&
      !storeMathElement["operator"]) ||
    (mathElement === "+/-" &&
      storeMathElement["firstNum"] &&
      !storeMathElement["secondNum"] &&
      storeMathElement["operator"])
  ) {
    if (inpValue > 0) {
      //Append - to a number (firstNum)
      firstNumPositiveToNegative();
    } else if (inpValue < 0) {
      //Append + to a number (firstNum)
      firstNumNegativeToPositive();
    }
  } else if (
    mathElement === "+/-" &&
    storeMathElement["firstNum"] &&
    storeMathElement["secondNum"] &&
    storeMathElement["operator"]
  ) {
    if (inpValue > 0) {
      //Append - to a number (secondNum)
      secondNumPositiveToNegative();
    } else if (inpValue < 0) {
      //Append + to a number (secondNum)
      secondNumNegativeToPositive();
    }
  }

  // Checks if operator exist in the storeMathElement object before adding the secondNum in the storeMathElement oject && accepts only digits.
  else if (storeMathElement["operator"] && splitDigit.includes(mathElement)) {
    //Checks if the secondNum key exists, if it does not exist it clears the inp screen for the secondNum value to be entered..
    if (!storeMathElement["secondNum"]) {
      inp.value = "";
      storeNumPeriod.splice(0);
    }

    storeNumPeriod.push(mathElement);
    filterPeriodFunc();

    //Append 0 before a period
    if (filterPeriod[0] === ".") {
      filterPeriod.splice(0, 0, "0");
    }

    inp.value = filterPeriod.join("");

    //Add the secondNum if the operator exist in the storeMathElement object
    storeMathElement["secondNum"] = inp.value;
    //Accepts only digit
  } else if (
    (mathElement === "%" &&
      storeMathElement["firstNum"] &&
      !storeMathElement["secondNum"] &&
      !storeMathElement["operator"]) ||
    (mathElement === "%" &&
      storeMathElement["firstNum"] &&
      !storeMathElement["secondNum"] &&
      storeMathElement["operator"])
  ) {
    firstNumConvertToPercentage();
    liveDisplay.textContent = inp.value;
  } else if (splitDigit.includes(mathElement)) {
    //Stops the summarize value to be appended to a number
    if (storeMathElement.stop) {
      if (splitDigit.includes(mathElement)) {
        storeNumPeriod.splice(0);
        inp.value = "";
        storeMathElement.stop = false;
      }
    }

    storeNumPeriod.push(mathElement);

    //Ensures the calculator does not accept more than one zero when starting a digit.
    filterZeroFunc();

    //Checks if any digit or period is clicked, then pushes it to storeNumPeriod array, and later filtered by filterPeriod array to select numbers and the first period in storeNumPeriod array.
    filterPeriodFunc();

    //Append 0 before a period
    if (filterPeriod[0] === ".") {
      filterPeriod.splice(0, 0, "0");
    }

    inp.value = filterPeriod.join("");
    // Add the firstNum
    storeMathElement["firstNum"] = inp.value;
  }
  //Allows operator to provide the evaluation of the previous expression
  else if (
    storeMathElement["firstNum"] &&
    storeMathElement["secondNum"] &&
    splitOperators.includes(mathElement)
  ) {
    liveDisplayFunc();
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
    liveDisplayFunc();
    operate(
      storeMathElement.operator,
      +storeMathElement.firstNum,
      +storeMathElement.secondNum
    );
    //Clears the input screen, also clear the storeMathElement object, and ensure that stop key remains in the storeMathElement object
  } else if (mathElement === "AC") {
    storeNumPeriod.splice(0);
    inp.value = "";
    for (let key in storeMathElement) {
      if (key === "stop") {
        storeMathElement[key] = true;
      } else {
        delete storeMathElement[key];
      }
    }
  }
});

function operate(operator, num1, num2) {
  if (operator === "+") inp.value = add(num1, num2);
  else if (operator === "-") inp.value = sub(num1, num2);
  else if (operator === "*") inp.value = mul(num1, num2);
  else if (operator === "/") inp.value = div(num1, num2);

  let updateFirstNum = inp.value;
  for (let key in storeMathElement) {
    if (key === "firstNum") storeMathElement[key] = updateFirstNum;
    else if (key === "stop") storeMathElement[key] = true;
    else {
      delete storeMathElement[key];
    }
  }
}

function liveDisplayFunc() {
  liveDisplay.textContent = `${storeMathElement.firstNum} ${storeMathElement.operator} ${storeMathElement.secondNum}`;

  animateLiveDisplay(storeMathElement.firstNum, storeMathElement.secondNum);
}

function animateLiveDisplay(num1, num2) {
  let len1 = +num1.length;
  let len2 = +num2.length;

  //Calculate the length of the numbers and apply it to it keyframes so as to provide adequate visibility for longer numbers
  let lenTotal = parseInt((len1 + len2) / 1.5);

  const style = document.createElement("style");
  style.textContent = `@keyframes scrolltext{
  50%{transform : translateX(0)}
  100%{transform: translateX(-${lenTotal}rem)};
}`;
  document.body.appendChild(style);
}

function firstNumPositiveToNegative() {
  storeNumPeriod.splice(0);

  //Update the storeNumPeriod to store the current value display in the input screen
  storeNumPeriod.splice(0, 0, `-${inp.value}`);
  filterPeriodFunc();

  //Execute mathElement that meet the filter condition
  inp.value = filterPeriod.join("");
  storeMathElement["firstNum"] = inp.value;
}

function firstNumNegativeToPositive() {
  let extractInp = inp.value.split("");
  let extractPositiveInp = extractInp.slice(1).join("");

  //Update the storeNumPeriod to store the current value display in the input screen
  storeNumPeriod.splice(0);
  storeNumPeriod.splice(0, 0, extractPositiveInp);
  filterPeriodFunc();

  //Execute mathElement that meet the filter condition
  inp.value = filterPeriod.join("");
  storeMathElement["firstNum"] = inp.value;
}

function secondNumPositiveToNegative() {
  storeNumPeriod.splice(0);

  //Update the storeNumPeriod to store the current value display in the input screen
  storeNumPeriod.splice(0, 0, `-${inp.value}`);
  filterPeriodFunc();

  //Execute mathElement that meet the filter condition
  inp.value = filterPeriod.join("");
  storeMathElement["secondNum"] = inp.value;
}

function secondNumNegativeToPositive() {
  let extractInp = inp.value.split("");
  let extractPositiveInp = extractInp.slice(1).join("");

  storeNumPeriod.splice(0);
  //Update the storeNumPeriod to store the current value display in the input screen
  storeNumPeriod.splice(0, 0, extractPositiveInp);
  filterPeriodFunc();

  //Execute mathElement that meet the filter condition
  inp.value = filterPeriod.join("");
  storeMathElement["secondNum"] = inp.value;
}

function firstNumConvertToPercentage() {
  let inpValue = +inp.value;
  let convertToPercentage = inpValue / 100;
  storeNumPeriod.splice(0);

  //Update the storeNumPeriod to store convertToPercentage value
  storeNumPeriod.splice(0, 0, convertToPercentage);
  //Extract the convertToPercentage value
  filterPeriodFunc();
  //Display the data on the screen
  inp.value = filterPeriod.join("");
  //store the displayed data on the screen in the storeMathElement object
  storeMathElement["firstNum"] = inp.value;
}

function filterPeriodFunc() {
  filterPeriod.splice(0);
  for (i = 0; i < storeNumPeriod.length; i++) {
    if (storeNumPeriod[i] === "." && filterPeriod.includes(".")) {
      continue;
    } else {
      filterPeriod.push(storeNumPeriod[i]);
    }
  }
}

function filterZeroFunc() {
  if (storeNumPeriod[0] === "0" && storeNumPeriod[1] === "0") {
    storeNumPeriod.splice(1, 1);
  }
}

resetButton.addEventListener("click", () => {
  inp.value = "";
  liveDisplay.textContent = "";
  storeNumPeriod.splice(0);

  for (let key in storeMathElement) {
    if (key === "stop") {
      storeMathElement[key] = false;
    } else {
      delete storeMathElement[key];
    }
  }
});

//View how the code is executed
console.log(storeMathElement);
