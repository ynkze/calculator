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
	case "/":
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

//AC
function allClear(){
    history.textContent = "";
    display.textContent = "";
}

//C
function clearFunc(){
    //will backspace history, or clear everything if there is a display
    if (display.textContent!=""){
        history.textContent = "";
        display.textContent = "";
    }
    else {
        history.textContent=history.textContent.slice(0, -1);
    }
}

//number function
function numberFunc(num){
    //if there is display, clear it
    if (display.textContent!=""){
        history.textContent = "";
        display.textContent = "";
    }
    historyShow(num);;
}

//operand function
function operandFunc(operandValue){
    //if there is already 2 numbers, sum up the previous numbers first
    num2 = history.textContent.slice((num1.length)+1);
    if (num2!=""){
        answer = operate(num1, operand, num2);
        answerShow(answer);
    }

    //store operand value
    operand = operandValue;
    historyShow(operandValue);
}

//equal function
function equalFunc(){
    num2 = history.textContent.slice((num1.length)+1);
    if (num2==""){
        answerShow(history.textContent);
    }
    else {
        answer = operate(num1, operand, num2);
        answerShow(answer);
    }
}


//what will happen on each button click
btns.forEach(btn => btn.addEventListener("click", ()=>{

    //AC
    if (btn.classList.contains("allclear")){
        allClear();
    }

    //C
    if (btn.classList.contains("clear")){
        clearFunc();
    }

    //decimal
    if (btn.classList.contains("decimal")){
        historyShow(btn.value);
    }

    //number
    if (btn.classList.contains("number")){
        numberFunc(btn.value);
    }

    //operand
    if (btn.classList.contains("operand")){
        operandFunc(btn.value);
    }
    
    //equal
    if (btn.classList.contains("equal")){
        equalFunc();
    }

}));

//keyboard support
document.addEventListener('keydown', function(event) {
    switch(event.key){
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            numberFunc(event.key);
            break;   
        case ".":
            historyShow(event.key);
            break;
        case "Backspace":
            clearFunc();
            break;
        case "+":
        case "-":
        case "x":
        case "/":
        case "%":
            operandFunc(event.key);
            break;
        case "*":
            operandFunc(event.key);
            break;
        case "=":
        case "Enter":
            equalFunc();
            break;
        default:
            break;
    }
});


