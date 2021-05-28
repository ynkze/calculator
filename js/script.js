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

function operate(a, operand, b){
    switch(operand){
        case "+":
            add(a,b);
            break;
        case "-":
            subtract(a,b);
            break;
        case "*":
            multiply(a,b);
            break;
        case "/":
            divide(a,b);
            break;
    }
}

const btns = document.querySelectorAll("button");
const display = document.querySelectorAll("#answer");
let displayNum;

function (){
    
}

btns.forEach(btn => btn.addEventListener("click", ()=>{
    if (btn.classList.contains("number")){
        displayNum = btn.value;
    }
}));


