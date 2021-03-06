let firstNumber = null;
let secondNumber = null;
let operatorValue = null;
let displayToBeCleared = false;
let result = null;

const numberButtons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const invButton = document.querySelector('.invert');
const percentButton = document.querySelector('.percent');
const decButton = document.querySelector('.decimal');
const isButton = document.querySelector('.equals');
const display = document.querySelector('#display');

function addNumber(number) {
    if (displayToBeCleared) clearDisplay();
    if (display.textContent.length >= 9) return;
    display.textContent += number;
}

function setOperator(operator) {
    if (operatorValue !== null) calc();
    if (display.textContent !== 'lol') {
        if (!/[+\-*\/]/.test(display.textContent)) {
            firstNumber = display.textContent;
            display.textContent += operator;
        }
        operatorValue = operator;
        displayToBeCleared = true;
    }
}

function calc() {
    if (operatorValue === null || displayToBeCleared) return;

    secondNumber = display.textContent;
    result = doOperation(operatorValue, firstNumber, secondNumber);

    if (result === 'lol') display.textContent = 'lol';
    else display.textContent = roundNum(result);

    displayToBeCleared = true;
    operatorValue = null;
}

const doOperation = (operation, x, y) => {
    x = Number(x);
    y = Number(y);
    switch (operation) {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '*':
            return x * y;
        case '/':
            if (y === 0) return 'lol';
            else return x / y;
        default:
            return null;
    }
};

function clearDisplay() {
    display.textContent = '';
    displayToBeCleared = false;
}

function reset() {
    display.textContent = '';
    firstNumber = null;
    secondNumber = null;
    operatorValue = null;
    displayToBeCleared = false;
}

function addDecimal() {
    if (displayToBeCleared) clearDisplay();
    if (!display.textContent.includes('.')) display.textContent += '.';
}

function percent() {
    display.textContent = Number(display.textContent) / 100;
}

const roundNum = number => {
    const numberOfDigits =
        Math.max(Math.floor(Math.log10(Math.abs(number))), 0) + 1;
    let decimalPlaces = 10 - numberOfDigits;

    if (decimalPlaces < 2) decimalPlaces = 2;
    if (Number.isInteger(number)) return number;

    return Number(
        Math.round(number + 'e' + decimalPlaces) + 'e-' + decimalPlaces
    );
};

for (let button of numberButtons) {
    button.addEventListener('click', () => {
        addNumber(button.value);
    });
}
for (let operator of operators) {
    operator.addEventListener('click', () => {
        setOperator(operator.value);
    });
}
isButton.addEventListener('click', calc);
clearButton.addEventListener('click', reset);
decButton.addEventListener('click', addDecimal);
percentButton.addEventListener('click', percent);
invButton.addEventListener('click', () => {
    display.textContent = '-' + display.textContent;
});

window.addEventListener('keydown', function (e) {
    const key = document.querySelector(`button[data-key='${e.key}']`);
    key.click();
});
