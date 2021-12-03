const display = document.getElementById('display');
const numbersBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const resultBtn = document.getElementById('equals');

let calculator = {
  problem: '',
  operand: false,
  number: false,
  result: false,
};

// Event listeners
numbersBtns.forEach(button => {
  button.addEventListener('click', () => {
    // false false false
    if (!calculator.operand && !calculator.number && !calculator.result) {
      updateDisplay(button);
    }
    // false true false
    if (!calculator.operand && calculator.number && !calculator.result) {
      updateDisplay(button);
    }
    // true false false
    if (calculator.operand && !calculator.number && !calculator.result) {
      clearDisplay(button);
    }
    // false true true
    if (!calculator.operand && calculator.number && calculator.result) {
      clearProblem();
      clearDisplay(button);

      calculator.result = false;
    }

    calculator.operand = false;
    calculator.number = true;
    console.log(calculator);

    addDigit(button);
    displayGlow();
  });
});

operatorBtns.forEach(button => {
  button.addEventListener('click', () => {
    if (!calculator.operand && button.id !== 'delete') calculate(calculator.problem);

    switch (button.id) {
      case 'delete':
        deleteNumbers();
        break;
      case 'divide':
        divide();
        break;
      case 'times':
        times();
        break;
      case 'minus':
        minus();
        break;
      case 'plus':
        plus();
        break;
    }

    if (button.id !== 'delete') calculator.operand = true;
    calculator.number = false;
    calculator.result = false;
    console.log(calculator);
    displayGlow();
  });
});

resultBtn.addEventListener('click', () => {
  calculator.result = true;
  calculate(calculator.problem);
  displayGlow();
  console.log(calculator);
});

// Functions
function updateDisplay(button) {
  display.textContent += button.textContent;
}

function clearDisplay(button) {
  display.textContent = button.textContent;
}

function addDigit(button) {
  calculator.problem += button.textContent;
}

function clearProblem() {
  calculator.problem = '';
}

function deleteNumbers() {
  display.textContent = '';
  calculator.problem = '';
  calculator.operand = false;
  calculator.number = false;
  calculator.result = false;
}

function divide() {
  calculator.problem += '/';
}
function times() {
  calculator.problem += '*';
}
function minus() {
  calculator.problem += '-';
}
function plus() {
  calculator.problem += '+';
}

function calculate(problem) {
  let solution = eval(problem);

  if (solution !== Infinity) {
    if (isFloat(solution)) {
      const length = solution.toString().slice(solution.toString().indexOf('.') + 1).length;
      console.log(length);
      length <= 4
        ? (solution = solution.toFixed(length).replace('.', ','))
        : (solution = solution.toFixed(4).replace('.', ','));
    }
    display.textContent = solution;
    calculator.problem = solution;
  } else {
    display.textContent = 0;
    calculator.problem = '';
  }
}

function isFloat(n) {
  return n === +n && n !== (n | 0);
}

function displayGlow() {
  const displayBox = document.querySelector('.display');

  displayBox.classList.add('glow');
  setTimeout(() => {
    displayBox.classList.remove('glow');
  }, 100);
}
