function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;

}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {

    if (b == 0) {
        return "ERROR"
    }
    return a / b;
}

function reminder(a, b) {

    return a % b;
}

function operate(a, op, b) {

    switch (op) {
        case "+": return add(a, b); break;
        case "-": return subtract(a, b); break;
        case "*": return multiply(a, b); break;
        case "/": return divide(a, b); break;
        case "%": return reminder(a, b); break;
        default: return "ERR";
    }
}
const input = document.querySelector(".input")
const result = document.querySelector(".result")
const buttons = document.querySelectorAll(".buttons");
let firstVal;
let secondVal;
let operator;

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
            console.log(firstVal)
            if (!(firstVal == undefined) && secondVal == undefined) {
                console.log(firstVal)
                secondVal = value;
            }
            else if (secondVal) {
                secondVal.append(value)
            }
            input.append(value)
        }
        if (type == "operator") {
            operator = value;
            firstVal = input.textContent;
            input.append(value)


        }
        if (type == "clear") {
            if (value == "ac") {
                input.textContent = ""
            }
            else if (value == "c") {

                input.textContent = input.textContent.slice(0, -1)
            }
        }
        if (type == "equal") {
            console.log(firstVal)
            console.log(secondVal)
            result.textContent = operate(parseFloat(firstVal), operator, parseFloat(secondVal))

        }
    }
    )
})