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

function operate(a, op, b) {
    switch (op) {
        case "+": add(a, b); break;
        case "-": subtract(a, b); break;
        case "*": multiply(a, b); break;
        case "/": divide(a, b); break;
    }
}

const buttons = document.querySelectorAll(".buttons");
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
})