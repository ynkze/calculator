function add(a,b){
    return a+b;
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
    a = Number(a);
    b= Number(b);
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
let num1="0", num2="0", operand, answer;

//history output
function historyShow(displayNum){

    history.textContent += displayNum;

    //if 2 operands is detected, disable
    if (history.textContent.search(/[x%÷\+-]{2,}/g)!="-1"){
        history.textContent=history.textContent.slice(0, -1);
    }
    
    //overflow reset the display
    if (history.textContent.length>14){
        alert("Number too big! Try a smaller number");
        history.textContent="";
    }

    //store num1 or num2 depending on whether operand exist
    if (history.textContent.search(/[x%÷\+-]/g)!="-1"){
        num2=history.textContent.slice((num1.length)+1);
    }
    else {
        num1 = history.textContent;
    }

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
    //if there is error
    if (isNaN(answer)){
        history.textContent= "";
        display.textContent= "ERROR";
        num1="0";
        num2="0";
    }
    else{
        //if overflow, round the precision
        if (answer.toString().length>10){
            answer=answer.toFixed(2);
        }
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
        historyShow(btn.value);
    }

    //number
    if (btn.classList.contains("number")){
        if (display.textContent!=""){
            history.textContent = "";
            display.textContent = "";
        }
        historyShow(btn.value);;
    }

    //operand
    //pressing any operand, need to consider if we already pressed operand
    if (btn.classList.contains("operand")){
        //num2 should be empty if it is our first number
        //if there is already 2 numbers, sum up the previous numbers first
        num2 = history.textContent.slice((num1.length)+1);
        if (num2!=""){
            answer = operate(num1, operand, num2);
            answerShow(answer);
        }

        //store operand value
        operand = btn.value;
        historyShow(btn.value);
    }
    
    //equal
    if (btn.classList.contains("equal")){
        num2 = history.textContent.slice((num1.length)+1);
        if (num2==""){
            answerShow(history.textContent);
        }
        else {
            answer = operate(num1, operand, num2);
            answerShow(answer);
        }
    }

}));

//keyboard support
document.addEventListener('keydown', function(event) {
    if(event.key == 1) {
        console.log();
    }
    else if(event.key == 39) {
        alert('Right was pressed');
    }
});


