function add(a, b) {
    return (a + b)
}

function subtract(a, b) {
    return (a - b)

}

function multiply(a, b) {
    return (a * b).toFixed(4);
}

function divide(a, b) {

    if (b == 0) {
        return "ERR"
    }
    return (a / b).toFixed(4);
}

function reminder(a, b) {

    return (a % b).toFixed(4);
}

function operate(a, op, b) {

    switch (op) {
        case "+": return add(a, b);;
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
        case "%": return reminder(a, b);
        default: return "ERR";
    }
}
const input = document.querySelector(".input")
const result = document.querySelector(".result")
const buttons = document.querySelectorAll(".buttons");
let firstVal;
let secondVal;
let operator;
let inputHolder = "";
const arrOp = ["+", "-", "%", "*"]

buttons.forEach((b) => {

    const baseName = b.dataset.img;
    const defaultImg = "./images/CalculatorPNG/" + baseName + ".png";
    const hoverImg = "./images/CalculatorPNG/" + baseName + "Hover" + ".png";

    b.style.backgroundImage = 'url("' + defaultImg + '")';

    b.addEventListener("mouseenter", () => {
        b.style.backgroundImage = 'url("' + hoverImg + '")';
    })
    b.addEventListener("mouseleave", () => {
        b.style.backgroundImage = 'url("' + defaultImg + '")';
    })

    // ------------------------------------------------------------
    const type = b.dataset.type;
    const value = b.dataset.value;
    b.addEventListener("click", () => {

        if (type == "number") {
            if (value == "." && inputHolder.includes(".")) {
                return;
            }
            inputHolder += value;
            input.textContent += value
        }
        if (type == "operator") {
            if (firstVal !== undefined && operator) {
                secondVal = inputHolder;
                firstVal = operate(parseFloat(firstVal), operator, parseFloat(inputHolder))
            }

            else {
                firstVal = inputHolder;
            }
            operator = value;
            inputHolder = ""
            input.textContent += value

        }
        if (type == "clear") {
            if (value == "ac") {
                input.textContent = "";
                inputHolder = "";
                result.textContent = "00000000000"
                result.style.color = "rgb(87, 83, 83, .4)"
                firstVal = undefined
                secondVal = undefined
                operator = ""
            }
            else if (value == "c") {

                let lastChar = input.textContent.slice(-1)
                input.textContent = input.textContent.slice(0, -1)
                if (arrOp.includes(lastChar)) {
                    operator = "";
                    inputHolder = firstVal
                }
                else {
                    inputHolder = inputHolder.slice(0, -1)
                }

            }
        }
        if (type == "equal") {
            if (inputHolder === "") return;
            result.style.color = "rgb(66, 64, 64)"
            if (operator == undefined) {
                result.textContent = inputHolder
            }
            else {
                secondVal = inputHolder;
                inputHolder = ""

                result.textContent = operate(parseFloat(firstVal), operator, parseFloat(secondVal))
                inputHolder = result.textContent;
                firstVal = undefined;
                secondVal = undefined;


            }

        }
    }
    )
})