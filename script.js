// ---Common variables & nodeLists---
var result = '';
var input = '';
var operation = undefined;

var numberButtonsNormal = document.querySelectorAll('.normal .row .num');
var operatorButtonsNormal = document.querySelectorAll('.normal .row .op');
var clrButtonsNormal = document.querySelectorAll('.normal .row .clr');
var equalButtonNormal = document.querySelector('.normal .row .equal');
var resultDisplay = document.querySelector('.display .dis1');
var inputDisplay = document.querySelector('.display .dis2');

// ---Functions---

// Clear function
function clearAll(){
    result = '';
    input = '';
    operation = undefined;
}

// Delete function
function deleteCurrent(){
    input = input.slice(0, -1);
}

// Append function
function appendNumber(number){
    // Period handling
    if(number === '.'){
        if(input.includes('.')) return;
        if(input.length == 0) input = input + 0;
    }
    input = input + number;
}

// Operator identification function
function identifyOperator(operator){
    if(input === '') return;
    if(result !== '') calculate();

    operation = operator;
    result = input;
    input = '';
}

// Compute function
function calculate(){
    var calculation;
    var res = parseFloat(result);
    var inp = parseFloat(input);

    if(isNaN(res) || isNaN(inp)) return;
    switch(operation){
        case '+':
            calculation = res + inp;
            break;
        case '-':
            calculation = res - inp;
            break;
        case '*':
            calculation = res * inp;
            break;
        case '/':
            calculation = res / inp;
            break;
        default:
            return;
    }

    input = calculation;
    operation = undefined;
    result = '';
}

// Display update function
function updateDisplay(){
    inputDisplay.innerText = input;
    resultDisplay.innerText = result;
}

// ---Event listeners for elements---

// Get numbers
// The forEach() method calls the provided function once for each element of the array. The provided function may perform any kind of operation on the elements of the given array.
numberButtonsNormal.forEach(function(number){
    number.addEventListener('click', function(){
        appendNumber(number.innerText);
        updateDisplay();
    });
});

// Clear & Delete
clrButtonsNormal.forEach(function(clr){
    clr.addEventListener('click', function(){
        if(clr.innerText === 'AC') clearAll();
        else deleteCurrent();
        updateDisplay();
    });
});

// Get operators
operatorButtonsNormal.forEach(function(op){
    op.addEventListener('click', function(){
        identifyOperator(op.innerText);
        updateDisplay();
    });
});

// Calculate
equalButtonNormal.addEventListener('click', function(){
    calculate();
    updateDisplay();
});