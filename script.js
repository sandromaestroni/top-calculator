function toSpelled(x) {
    let nums = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    return nums[x];
}

function isZero(s) {
    return (s === '0');
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

function operate(op, x, y) {
    switch (op) {
        case 'add':
            return add(x, y);
        case 'subtract':
            return subtract(x, y);
        case 'multiply':
            return multiply(x, y);
        case 'divide':
            return divide(x, y);
        case 'percent':
            if (y === 0) {
                return x/100;
            }
            return operate('multiply', x / 100, y);
        default:
            return x;
    }
}

function logNumber(entry) {
    if (logging === "a") {
        if (overrideA || isZero(a)) {
            a = `${entry}`;
            overrideA = false;
        } else {
            a += entry;
        }
        displayedText.textContent = a;
    } else if (logging === "b") {
        if (isZero(b)) {
            b = entry;
        } else {
            b += entry;
        }
        displayedText.textContent = b;
    }
}

function evaluate(x, y) {
    let result = operate(op, Number(x), Number(y));
    displayedText.textContent = `${result}`;
    a = `${result}`;
    b = '';
    logging = 'a';
    overrideA = true;
}

let logging = 'a';
let op = '';
let a = '';
let b = '';
let allowDecimal = false;
let overrideA = false;

for (let i = 0; i < 10; i++) {
    const spelled = toSpelled(i);
    const elm = document.querySelector(`.${spelled}`);
    elm.addEventListener('click', () => {
        logNumber(i);
    });
}

const displayedText = document.querySelector('.display');

const ce = document.querySelector('.ce');
ce.addEventListener('click', function () {
    a = b = op = '';
    logging = 'a';
    overrideA = false;
    allowDecimal = false;
    displayedText.textContent = '0';
})

const addBtn = document.querySelector('.add');
const subtrBtn = document.querySelector('.subtr');
const multiplyBtn = document.querySelector('.multiply');
const divideBtn = document.querySelector('.divide');
const percentBtn = document.querySelector('.percent');
const equalBtn = document.querySelector('.equal');
const dotBtn = document.querySelector('.dot');

addBtn.addEventListener('click', () => {
    op = 'add';
    logging = 'b';
    allowDecimal = false;
    if (a != '' && b != '') {
        evaluate(a, b);
        logging = 'b';
    }
});
subtrBtn.addEventListener('click', () => {
    op = 'subtract';
    logging = 'b';
    allowDecimal = false;
    if (a != '' && b != '') {
        evaluate(a, b);
        logging = 'b';
    }
});
multiplyBtn.addEventListener('click', () => {
    op = 'multiply';
    logging = 'b';
    allowDecimal = false;
    if (a != '' && b != '') {
        evaluate(a, b);
        logging = 'b';
    }
});
divideBtn.addEventListener('click', () => {
    op = 'divide';
    logging = 'b';
    allowDecimal = false;
    if (a != '' && b != '') {
        evaluate(a, b);
        logging = 'b';
    }
});
percentBtn.addEventListener('click', () => {
    op = 'percent';
    logging = 'b';
    allowDecimal = false;
    if (a != '' && b != '') {
        evaluate(a, b);
        logging = 'b';
    }
})
equalBtn.addEventListener('click', () => {
    evaluate(a, b);
    op = '';
    overrideA = true;
    allowDecimal = false;
})
dotBtn.addEventListener('click', () => {
    if (!allowDecimal) {
        allowDecimal = true;
        if (logging === 'a') {
            a += '.';
        } else {
            b += '.';
        }
    }
})



