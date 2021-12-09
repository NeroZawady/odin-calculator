const numbers = Array.from(document.querySelector("#mainContainer").querySelectorAll("#number")).sort((a, b) => ((a.textContent > b.textContent) ? 1 : -1));
const buttonAdd = document.querySelector("#add");
const buttonSubtract = document.querySelector("#subtract");
const buttonMultiply = document.querySelector("#multiply");
const buttonDivide = document.querySelector("#divide");
const buttonEquals = document.querySelector("#equals");
const buttonPoint = document.querySelector("#point");
const buttonDelete = document.querySelector("#delete");
const buttonClear = document.querySelector("#clear");
const display = document.querySelector("#display");
const operandDiv = document.querySelector("#operand");

let operand = "";
let operator = "";

// https://stackoverflow.com/questions/17369098/simplest-way-of-getting-the-number-of-decimals-in-a-number-in-javascript
Number.prototype.countDecimals = function () {

    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;

    var str = this.toString();
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
        return str.split("-")[1] || 0;
    } else if (str.indexOf(".") !== -1) {
        return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
}

buttonPoint.addEventListener("click", () => {
    if(!display.textContent.includes(".")) {
        display.textContent += ".";
    }
});

numbers.forEach(element => {
    element.addEventListener("click", () => (numberPressed(element.textContent)));
});

function numberPressed(number) {
    if((+display.textContent).countDecimals() < 15) display.textContent += number;
}

buttonDelete.addEventListener("click", () => (display.textContent = display.textContent.slice(0, -1)    ));

buttonClear.addEventListener("click", () => {
    operator = "";
    operand = "";
    operandDiv.textContent = "";
    display.textContent = "";
});

buttonAdd.addEventListener("click", (element) => (processOperator("+")));
buttonSubtract.addEventListener("click", (element) => (processOperator("-")));
buttonMultiply.addEventListener("click", (element) => (processOperator("*")));
buttonDivide.addEventListener("click", (element) => (processOperator("/")));

function processOperator(op) {
    if(display.textContent === "" && operand !== "") {
        operator = op;
        updateOperandDiv();
    } else if(display.textContent !== "" && operand !== "") {
        operand = evaluate(display.textContent);
        display.textContent = "";
        operator = op;
        updateOperandDiv();
    } else if(display.textContent !== "" && operand === "") {
        operand = round(display.textContent);
        display.textContent = "";
        operator = op;
        updateOperandDiv();
    }
}

buttonEquals.addEventListener("click", () => {
    if(display.textContent !== "" && operand !== "") {
        display.textContent = evaluate(display.textContent);
        operator = "";
        operand = "";
        updateOperandDiv();
    }
});

function evaluate(operandB) {
    if(operator === "+") {
        return round(+operand + +operandB); 
    } else if(operator === "-") {
        return round(+operand - +operandB);
    } else if(operator === "*") {
        return round(+operand * +operandB);
    } else if(operator === "/") {
        if(operandB === "0") {
            alert("Erorr - division by 0");
            return 0;
        }
        return round(+operand / +operandB);
    }
}

function round(number) {
    let decimals = (+number).countDecimals();
    if(decimals > 15) return (+number).toFixed(decimals-1);
    return +number;
}

function updateOperandDiv() {
    operandDiv.textContent = operator + " " + operand;
}