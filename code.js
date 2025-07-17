function add(a, b) {
    return (a + b)
}

function subtract(a, b) {
    return (a - b)
}

function multiply(a, b) {
    return (a * b).toFixed(3);
}

function divide(a, b) {

    if (b == 0) { return "ERR" }
    return (a / b).toFixed(3);
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
const arrOp = ["+", "-", "%", "*", "/"];
const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

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

    // -------------------------the logic---------------------------------------
    const type = b.dataset.type;
    const value = b.dataset.value;
    b.addEventListener("click", () => {

        if (type == "number") {
            if ((value == "." && inputHolder.includes(".")) || input.textContent.length > 10) {
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
                firstVal = secondVal = operator = undefined
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
                firstVal = secondVal = operator = undefined;
            }
        }
    }
    )
}
)

//keyboard support
document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (key === "Enter") {
        const button = document.querySelector('[data-value="="]')
        button.click()
        changeBg(button)
        return;
    }
    if (key === "Escape") {

        const button = document.querySelector('[data-value="ac"]')
        button.click();
        changeBg(button);
        return;
    }
    if (key === "Backspace") {
        const button = document.querySelector('[data-value="c"]')
        button.click();
        changeBg(button);
        return
    }
    if (arrOp.includes(key) || nums.includes(key)) {
        const button = document.querySelector(`[data-value="${key}"]`)
        button.click();
        changeBg(button)
        return;
    }
})

function changeBg(button) {

    const baseName = button.dataset.img;
    const defaultImg = "./images/CalculatorPNG/" + baseName + ".png";
    const hoverImg = "./images/CalculatorPNG/" + baseName + "Hover" + ".png";

    button.style.backgroundImage = 'url("' + hoverImg + '")';

    setTimeout(() => {
        button.style.backgroundImage = 'url("' + defaultImg + '")';

    }, 180);

}
