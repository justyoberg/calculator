const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

var screenText = document.querySelector(".screen-text");
var overflowText = screenText.textContent;
var secondInput = "";


// Create number button functionality 
numberButtons.forEach(button => button.addEventListener("click", function() {

  // Update the screen text on button click if the number is less than 8 digits
  if (overflowText.length < 8) {
    overflowText += button.textContent;
    screenText.textContent += button.textContent;
  } else {
    // If the screenText is longer than 8 digits, log the actual number in overflowText
    // and add ellipsis to the screenText
    overflowText += button.textContent;
    screenText.textContent = "..." + overflowText.slice(-8);
    console.log(overflowText);
    console.log(screenText.textContent);
    }
  
}));

// Create operator button functionality
operatorButtons.forEach(button => button.addEventListener("click", function() {

  // If there isn't a number entered, then you can't operate on it
  if (screenText.textContent === "0") return;
  operate()
  
}));

function operate(operator, x, y) {
  if (operator === "+") add(x, y);
  else if (operator === "-") subtract(x, y);
  else if (operator === "x") multiply(x, y);
  else if (operator === "÷") divide(x, y);
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}
