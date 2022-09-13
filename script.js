class Calculator {
    constructor() {
        this.logging = 'firstOperand';
        this.op = '';
        this.firstOperand = '';
        this.secondOperand = '';
        this.allowDecimal = true;
        this.overrideA = false;
    }
    display(str) {
        const displayedText = document.querySelector('.display');
        if (str.length < 12) {
            displayedText.textContent = str;
        } else {
            // Scientific notation future maybe
            displayedText.textContent = 'Error';
        }
    }
    clear() {
        this.firstOperand = this.secondOperand = this.op = '';
        this.logging = 'firstOperand';
        this.overrideA = false;
        this.allowDecimal = true;
        this.display('0');
    }
    operate() {
        const x = Number(this.firstOperand);
        const y = Number(this.secondOperand);
        switch (this.op) {
            case 'add':
                return `${x + y}`;
            case 'subtract':
                return `${x - y}`;
            case 'multiply':
                return `${x * y}`;
            case 'divide':
                if (y === 0) return 'Error';
                return `${(x / y).toFixed(3)}`;
            case 'percent':
                if (y === 0) {
                    return `${x / 100}`;
                }
                return `${(x / 100) * y}`;
            default:
                return `${x}`;
        }
    }
    logNumber(entry) {
        if (this.logging === "firstOperand") {
            if (this.overrideA || (this.firstOperand == 0 && this.firstOperand !== '0.')) {
                this.firstOperand = `${entry}`;
                this.overrideA = false;
            } else {
                this.firstOperand += `${entry}`;
            }
            this.display(this.firstOperand);
        } else if (this.logging === "secondOperand") {
            if (this.secondOperand == 0) {
                this.secondOperand = `${entry}`;
            } else {
                this.secondOperand += `${entry}`;
            }
            this.display(this.secondOperand);
        }
    }
    evaluate() {
        let result = this.operate();
        this.display(result);
        this.firstOperand = `${result}`;
        this.secondOperand = '';
        this.logging = 'firstOperand';
        this.overrideA = true;
    }
    operation(str) {
        this.op = str;
        this.logging = 'secondOperand';
        this.allowDecimal = true;
        if (this.firstOperand !== '' && this.secondOperand !== '') {
            this.evaluate(this.firstOperand, this.secondOperand);
            this.logging = 'secondOperand';
        }
    }
    dot() {
        if (this.allowDecimal) {
            if (this.logging === 'firstOperand') {
                if (this.overrideA || this.firstOperand == 0) {
                    this.firstOperand = '0.';
                    this.overrideA = false;
                } else {
                    this.firstOperand += '.';
                }
                this.display(this.firstOperand);
            } else {
                if (this.overrideA || this.secondOperand == 0) {
                    this.secondOperand = '0.';
                    this.overrideA = false;
                } else {
                    this.secondOperand += '.';
                }
                this.display(this.secondOperand);
            }
            this.allowDecimal = false;
        }  
    }
    equals() {
        this.evaluate(this.firstOperand, this.secondOperand);
        this.op = '';
        this.overrideA = true;
        this.allowDecimal = true;
    }
}


const calc = new Calculator();

// Event listeners for number buttons
for (let i = 0; i < 10; i++) {
    let nums = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const spelled = nums[i];
    const elm = document.querySelector(`.${spelled}`);
    elm.addEventListener('click', () => {
        calc.logNumber(i);
    });
}

// Event listeners for operation buttons
const ceBtn = document.querySelector('.ce');
const addBtn = document.querySelector('.add');
const subtrBtn = document.querySelector('.subtr');
const multiplyBtn = document.querySelector('.multiply');
const divideBtn = document.querySelector('.divide');
const percentBtn = document.querySelector('.percent');
const equalBtn = document.querySelector('.equal');
const dotBtn = document.querySelector('.dot');

ceBtn.addEventListener('click', () => {
    calc.clear();
})
addBtn.addEventListener('click', () => {
    calc.operation('add');
})
subtrBtn.addEventListener('click', () => {
    calc.operation('subtract');
})
multiplyBtn.addEventListener('click', () => {
    calc.operation('multiply');
})
divideBtn.addEventListener('click', () => {
    calc.operation('divide');
})
percentBtn.addEventListener('click', () => {
    calc.operation('percent');
})
equalBtn.addEventListener('click', () => {
    calc.equals();
})
dotBtn.addEventListener('click', () => {
    calc.dot();
})