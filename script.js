// ---Common variables & nodeLists---
var result = '';
var expression = '';
var operation = undefined;

var numberButtonsNormal = document.querySelectorAll('.normal .row .num');
var operatorButtonsNormal = document.querySelectorAll('.normal .row .op');
var clrButtonsNormal = document.querySelectorAll('.normal .row .clr');
var resultDisplay = document.querySelector('.display .dis1');
var expressionDisplay = document.querySelector('.display .dis2');

// ---Functions---

// Clear function
function clearAll(){
    result = '';
    expression = '';
    operation = undefined;
}

// Delete function
function deleteCurrent(){
    expression = expression.slice(0, -1);
}

// Append function
function appendNumber(number){
    if(number === '.' && expression.includes('.')){
        return;
    }
    expression = expression + number;
    console.log(expression);
}

// Operator identification function
function identifyOperator(){

}

// Compute function
function compute(){

}

// Display update function
function updateDisplay(){
    expressionDisplay.innerText = expression;
}

// ---Get numbers process---
// The forEach() method calls the provided function once for each element of the array. The provided function may perform any kind of operation on the elements of the given array.
numberButtonsNormal.forEach(function(number){
    number.addEventListener('click', function(){
        appendNumber(number.innerText);
        updateDisplay();
    });
});

// ---Clear & Delete process---
clrButtonsNormal.forEach(function(clr){
    clr.addEventListener('click', function(){
        clr.innerText === 'AC' ? clearAll() : deleteCurrent();
        updateDisplay();
    });
});