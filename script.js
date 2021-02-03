// ---Common variables, nodeLists & objects---
var numberButtonsNormal = document.querySelectorAll('.normal .row .num');
var operatorButtonsNormal = document.querySelectorAll('.normal .row .op');
var clrButtonsNormal = document.querySelectorAll('.normal .row .clr');

var equalButtonNormal = document.querySelector('.normal .row .equal');
var expressionDisplay = document.querySelector('.display .dis1');
var operationDisplay = document.querySelector('.display .dis2');

var darkMode = document.querySelector('#dark');
var wrapper = document.querySelector('.wrapper');

var operators = ['+', '-', '*','/'];
var power = 'POWER(';
var factorial = 'FACTORIAL';
var expDis = '';
var opDis = '';
var lastOp = '';
var result = '';
var isPeriod = false;
var dark = false;

// ---Functions---

// Clear function
function clearAll(){
    opDis = '';
    expDis = '';
    result = '';
    lastOp = '';
}

// Delete function
function deleteCurrent(){
    opDis = opDis.slice(0, -1);
}

// Append function
function appendNumber(number){
    // Control period
    if(number === '.'){
        if(opDis === ''){
            opDis += 0;
        }
        if(!isPeriod){
            isPeriod = true;
        }
        else{
            return;
        }
    }
    // Update opDis
    opDis += number;
}

// Operator identification function
function identifyOperator(operator){
    isPeriod = false;
    if(!opDis) return;

    if(operator === 'x2'){
        opDis = parseFloat(opDis) ** 2;
        return;
    }
    else{
        if(expDis && opDis && lastOp){
            // Start calculation
            basicCalculation();
        }
        else{
            // Update result
            result = parseFloat(opDis);
        }

        // Update expDis
        expDis += opDis + ' ' + operator + ' ';
    }

    // Update opDis
    opDis = '';
    // Update lastOp
    lastOp = operator;
}

// Basic calculation function
function basicCalculation(){
    switch(lastOp){
        case '+':
            result = parseFloat(result) + parseFloat(opDis);
            break;
        case '-':
            result = parseFloat(result) - parseFloat(opDis);
            break;
        case '*':
            result = parseFloat(result) * parseFloat(opDis);
            break;
        case '/':
            result = parseFloat(result) / parseFloat(opDis);
            break;
        case '%':
            result = parseFloat(result) % parseFloat(opDis);
            break;
        default:
            return;
    }
}

// Display update function
function updateDisplay(){
    operationDisplay.innerText = opDis;
    expressionDisplay.innerText = expDis;
    operationDisplay.placeholder = result;
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

// For equal
equalButtonNormal.addEventListener('click', function(){
    isPeriod = false;
    basicCalculation();
    opDis = result;
    expDis = '';
    result = '';
    updateDisplay();
});

// For dark Mode
darkMode.addEventListener('change', function(){
    if(this.checked){
        wrapper.classList.add('dark')
    }else{
        wrapper.classList.remove('dark')
    }
});





