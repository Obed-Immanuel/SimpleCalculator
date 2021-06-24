class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operator = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.toString().indexOf('.') !== -1) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operator) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operator = operator
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let result
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev + current;
                break;
            case '*':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = result
        this.operator = undefined
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operator != null)
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operator}`
        else
            this.previousOperandTextElement.innerText = ''
    }
}

const numberButtons = document.querySelectorAll('.Number');
const operatorButtons = document.querySelectorAll('.Operator');
const equalsButton = document.querySelector('.EqualsBtn');
const deleteButton = document.querySelector('.DelBtn');
const allClearButton = document.querySelector('.AllClearBtn');
const previousOperandTextElement = document.querySelector('.operand');
const currentOperandTextElement = document.querySelector('.result')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

for (let numberButton of numberButtons) {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText)
        calculator.updateDisplay()
    })
}

for (let operatorButton of operatorButtons) {
    operatorButton.addEventListener('click', () => {
        calculator.chooseOperation(operatorButton.innerText)
        calculator.updateDisplay()
    })
}

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})
