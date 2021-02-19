let displayValue = '';
let firstNumber = null;
let secondNumber = null;
let operatorValue = null;
let result = 0;
let multi = false;

const numberButtons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const invButton = document.querySelector('.invert');
const percentButton = document.querySelector('.percent');
const decButton = document.querySelector('.decimal');
const isButton = document.querySelector('.equals');

const operate = (op, x, y) => {
    switch (op) {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '*':
            return x * y;
        case '/':
            if (y === 0) return 'lol';
            else return x / y;
    }
};

function updateDisplay() {
    const display = document.getElementById('display');

    display.innerText = displayValue;
    if (displayValue && displayValue.length > 10) {
        display.innerText = displayValue.substring(0, 10);
    }
    if (displayValue === 'lol') {
        displayValue = '';
        firstNumber = null;
        operatorValue = null;
    }
}
function operatorPress(operator) {
    if (operatorValue === null) {
        operatorValue = operator;
        firstNumber = displayValue;
        displayValue += operator;
        updateDisplay();
    } else {
        firstNumber = operate(
            operatorValue,
            Number(firstNumber),
            Number(displayValue)
        );
        if (firstNumber !== 'lol') {
            firstNumber = roundNum(firstNumber, 10).toString();
        }
        displayValue = firstNumber;
        result = firstNumber;
        operatorValue = operator;
        multi = true;
        updateDisplay();
    }
}

function numberPress(value) {
    if (
        displayValue === firstNumber + operatorValue ||
        result === displayValue
    ) {
        displayValue = value;
        multi = false;
    } else {
        displayValue += value;
    }
}

function clearE() {
    displayValue = '';
    firstNumber = null;
    secondNumber = null;
    operatorValue = null;
    result = null;
    updateDisplay();
}

function calc() {
    if (!multi && operatorValue) {
        if (/[+-/*]$/.test(displayValue)) {
            if (operatorValue === '+' || operatorValue === '-') {
                secondNumber = 0;
            } else {
                secondNumber = 1;
            }
        } else {
            secondNumber = displayValue;
        }

        result = operate(
            operatorValue,
            Number(firstNumber),
            Number(secondNumber)
        );
        if (result !== 'lol') {
            result = roundNum(result, 8).toString();
        }
        displayValue = result;
        operatorValue = null;
        firstNumber = result;
        multi = false;
    } else if (!secondNumber) {
        firstNumber = displayValue;
        operatorValue = null;
        displayValue = result;
    } else {
        operatorValue = null;
        displayValue = result;
    }
    updateDisplay();
}

function decimal() {
    if (displayValue.includes('.')) {
    } else {
        displayValue += '.';
        updateDisplay();
    }
}

function percent() {
    displayValue = (displayValue / 100).toString();
    updateDisplay();
}

function invert() {
    displayValue = (displayValue * -1).toString();
    updateDisplay();
}

const roundNum = (number, decimalPlaces) =>
    Number(Math.round(number + 'e' + decimalPlaces) + 'e-' + decimalPlaces);

function addEventListeners() {
    for (let button of numberButtons) {
        button.addEventListener('click', () => {
            numberPress(button.value);
            updateDisplay();
        });
    }
    for (let operator of operators) {
        operator.addEventListener('click', () => {
            operatorPress(operator.value);
        });
    }
    isButton.addEventListener('click', () => {
        calc();
    });
    clearButton.addEventListener('click', () => {
        clearE();
    });
    decButton.addEventListener('click', () => {
        decimal();
    });
    percentButton.addEventListener('click', () => {
        percent();
    });
    invButton.addEventListener('click', () => {
        invert();
    });
}

addEventListeners();
