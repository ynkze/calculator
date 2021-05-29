function add(a,b){
    return parseFloat(a)+parseFloat(b);
}

function subtract(a,b){
    return a-b;
}

function divide(a,b){
    return a/b;
}

function multiply(a,b){
    return a*b;
}

function modulus(a,b){
    return a%b;
}

function operate(a, operand, b){
    switch(operand){
        case "+":
            return add(a,b);
            break;
        case "-":
            return subtract(a,b);
            break;
        case "x":
            return multiply(a,b);
            break;
        case "÷":
            if (b==0){
                return "ERROR";
            }
            else {
                return divide(a,b);
            }
            break;
        case "%":
            return modulus(a,b);
    }
}

const btns = document.querySelectorAll("button");
const display = document.querySelector("#answer");
const history = document.querySelector("#history");
const clear = document.querySelector("#clear")
const allclear = document. querySelector("#allclear")

//use 0 for the numbers so we can accept negatives at the start
let displayNum, num1="0", num2="0", operand, answer;

//history output
function historyShow(displayNum){
    
    history.textContent += displayNum;

    // if display has output, store it to history upon another input
    if (display.textContent!=""){
        if (display.textContent=="ERROR"){
            display.textContent="";
        }
        num1=display.textContent;
        display.textContent="";
        history.textContent=num1+displayNum;
    }
}

//answer output
function answerShow(answer){
    if (isNaN(answer)){
        history.textContent= "";
        display.textContent= "ERROR";
        num1="0";
        num2="0";
    }
    else{
        display.textContent = answer;
    }
}


//what will happen on each button click
btns.forEach(btn => btn.addEventListener("click", ()=>{

    //AC will clear everything
    if (btn.classList.contains("allclear")){
        history.textContent = "";
        display.textContent = "";
    }

    //C
    //will backspace history, or clear everything if there is a display
    if (btn.classList.contains("clear")){
        if (display.textContent!=""){
            history.textContent = "";
            display.textContent = "";
        }
        else {
            history.textContent=history.textContent.slice(0, -1);
        }
    }

    //decimal
    if (btn.classList.contains("decimal")){
        displayNum = btn.value;
        historyShow(displayNum);
    }

    //number
    if (btn.classList.contains("number")){
        displayNum = btn.value;
        historyShow(displayNum);
    }

    //operand
    //pressing any operand, need to consider if we already pressed operand
    if (btn.classList.contains("operand")){
        //num2 should be empty if it is our first number
        //if there is already 2 numbers, sum up the previous numbers first
        num2 = history.textContent.substring((num1.length)+1);
        if (num2!=""){
            answer = operate(num1, operand, num2);
            answerShow(answer);
        }

        //store first number value
        num1 = history.textContent;
        operand = btn.value;
        historyShow(btn.value);
    }
    
    //equal
    if (btn.classList.contains("equal")){
        num2 = history.textContent.substring((num1.length)+1);
        answer = operate(num1, operand, num2);
        answerShow(answer);
    }

}));


