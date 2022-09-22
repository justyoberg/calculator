const buttons = document.querySelectorAll("button");
const screen = document.querySelector(".screen-text");
const numberList = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operatorList = ["+", "/", "-", "*", ".", "=", "Enter"];

var total = "";
var input = "";
var operator = null;


// Main button click functionality
buttons.forEach(button => button.addEventListener("click", function () {

  if (!isNaN(button.textContent)) {
    inputNumbers(button);
  } else if (isNaN(button.textContent)) {
    inputOperator(button);
  }  

}));


// Main keyboard input functionality
window.addEventListener("keydown", function (e) {
  
  if (numberList.includes(e.key)) {
    keyboardInputNum(e.key);
  } else if (operatorList.includes(e.key)) {
    keyboardInputOper(e.key);
  }

});

function operate(operator, x, y) {
  if (operator === "+") return add(x, y);
  else if (operator === "-") return subtract(x, y);
  else if (operator === "*") return multiply(x, y);
  else if (operator === "/") return divide(x, y);
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
  if (x == 0 || y == 0) {
    clear();
    return screen.textContent = "Nice try!";
  }
  operator = null;
  total = parseFloat(x) / parseFloat(y);
  updateScreen(total);
  input = "";
}

function clear() {
  screen.textContent = "";
  input = "";
  total = "";
  operator = null;
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
  if (value != "." && value % 1 != 0) {
    value = parseFloat(value).toFixed(4);
  }
  if (value.toString().length >= 12) {
    screen.textContent = "< " + value.toString().slice(-12);
  } else {
    screen.textContent = value.toString();
  }
}


function inputNumbers(button) {

  if (input[0] == "0") {
    input = button.textContent;
    updateScreen(input);
  } else {
    input += button.textContent;
    updateScreen(input)
  }
}

function inputOperator(button) {

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

function keyboardInputNum(key) {

  if (input[0] == "0") {
    input = key;
    updateScreen(input);
  } else {
    input += key;
    updateScreen(input)
  }
}

function keyboardInputOper(key) {
  
  if (key === "c") return clear();
    else if (key === ".") return addDecimal();
    else if (operatorList.includes(key)) {
      
      if (operator === null) {
        operator = key;
        total += input;
        input = "";
      } else {
        calculate();
        operator = key;
      }
    
    }
    else if (key === "Enter") return calculate();
}