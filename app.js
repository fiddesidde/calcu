let displayValue = '';
let firstNumber = null;
let secondNumber = null;
let operatorValue = null;
let toBeReset = false;

const numberButtons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const invButton = document.querySelector('.invert');
const percentButton = document.querySelector('.percent');
const decButton = document.querySelector('.decimal');
const isButton = document.querySelector('.equals');

const doOperation = (operation, x, y) => {
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

const roundNum = (number, decimalPlaces) =>
    Number(Math.round(number + 'e' + decimalPlaces) + 'e-' + decimalPlaces);

function addEventListeners() {
    for (let button of numberButtons) {
        button.addEventListener('click', () => {
            numberPress(button.value);
        });
    }
    for (let operator of operators) {
        operator.addEventListener('click', () => {
            operatorPress(operator.value);
        });
    }
    isButton.addEventListener('click', () => {
        // calc();
    });
    clearButton.addEventListener('click', () => {
        // clearE();
    });
    decButton.addEventListener('click', () => {
        // decimal();
    });
    percentButton.addEventListener('click', () => {
        // percent();
    });
    invButton.addEventListener('click', () => {
        // invert();
    });
}

window.addEventListener('keydown', function (e) {
    const key = document.querySelector(`button[data-key='${e.key}']`);
    key.click();
});

addEventListeners();
