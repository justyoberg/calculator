const buttons = document.querySelectorAll("button");
const screen = document.querySelector(".screen-text");
const operatorList = ["+", "÷", "-", "x"]

var total = "";
var input = "";
var operator = null;

buttons.forEach(button => button.addEventListener("click", function () {
  
  if (!isNaN(button.textContent)) {

    if (input[0] == "0") {
      input = button.textContent;
      updateScreen(input);
    } else {
      input += button.textContent;
      updateScreen(input)
    }
   
  } else if (isNaN(button.textContent)) {

    if (button.textContent === "c") return clear();
    else if (button.textContent === ".") return addDecimal();
    else if (operatorList.includes(button.textContent)) {
      if (operator === null) {
        operator = button.textContent;
        total += input;
        input = "";
      } else {
        calculate();
        operator = button.textContent;
      }
    }
    else if (button.textContent === "=") return calculate();
  }
}));

function operate(operator, x, y) {
  if (operator === "+") return add(x, y);
  else if (operator === "-") return subtract(x, y);
  else if (operator === "x") return multiply(x, y);
  else if (operator === "÷") return divide(x, y);
}

function add(x, y) {
  operator = null;
  total = parseFloat(x) + parseFloat(y);
  updateScreen(total);
  input = "";
}

function subtract(x, y) {
  operator = null;
  total = parseFloat(x) - parseFloat(y);
  updateScreen(total);
  input = "";
}

function multiply(x, y) {
  operator = null;
  total = parseFloat(x) * parseFloat(y);
  updateScreen(total);
  input = "";
}

function divide(x, y) {
  operator = null;
  total = parseFloat(x) / parseFloat(y);
  updateScreen(total);
  input = "";
}

function clear() {
  screen.textContent = "";
  input = "";
  total = "";
  operator = "";
}

function addDecimal() {
  // If there is no decimal in the current input already then add one
  if (!(/[.]/).test(input)) {
    input += ".";
    updateScreen(input);
  }
}

function calculate() {
  if (total && operator && input) {
    return operate(operator, total, input);
  }
}

function updateScreen(value) {
  if (value.toString().length >= 8) {
    screen.textContent = "<" + value.toString().slice(-8);
  } else {
    screen.textContent = value.toString();
  }
}
