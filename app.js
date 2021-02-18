function sum(arr) {
    return arr.reduce((ack, cur) => ack + cur, 0);
}

function multiplyArray(arr) {
    return arr.reduce((ack, cur) => ack * cur, 1);
}

function power(n, pow) {
    return Math.pow(n, pow);
}

function factorial(n) {
    if (n === 1 || n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

const operate = (op, x, y) => {
    if (op === '+') {
        return x + y;
    } else if (op === '-') {
        return x - y;
    } else if (op === '*') {
        return x * y;
    } else if (op === '/') {
        if (y === 0) {
            return 'lmao';
        } else {
            return x / y;
        }
    }
};
