// ---Common variables & nodeLists---
// For basic calculator
var numberButtonsNormal = document.querySelectorAll('.normal .row .num');
var operatorButtonsNormal = document.querySelectorAll('.normal .row .op');
var clrButtonsNormal = document.querySelectorAll('.normal .row .clr');

var equalButtonNormal = document.querySelector('.normal .row .equal');
var expressionDisplay = document.querySelector('.display .dis1');
var operationDisplay = document.querySelector('.display .dis2');
var scCal = document.querySelector('.wrapper .science');

var operators = ['+', '-', '*','/'];
var power = 'POWER(';
var factorial = 'FACTORIAL';
var expDis = opDis = lastOp = result = '';
var isPeriod = dark = false;

// For other elements
var darkMode = document.querySelector('#dark');
var wrapper = document.querySelector('.wrapper');
var timeUp = document.querySelector('.time');
var scMode = document.querySelector('#sct');

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

// Number append function
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

// Activate dark mode function
function activityDark(){
    if(darkMode.checked){
        wrapper.classList.add('dark');
    }else{
        wrapper.classList.remove('dark');
        darkMode.checked = false;
    }
}

// Limit drag and drop function
function limitDrag(){
    if(window.innerWidth > '500'){
        wrapper.setAttribute('draggable', true);
    }
    else{
        wrapper.setAttribute('draggable', false);
    }

    console.log(window.innerWidth);
}

// Time update function
function timeUpdate(){
    var time = new Date().toUTCString();
    timeUp.value = time;
}

// Activate scientific mode
function activateScmode(){
    if(scMode.checked){
        scCal.style.visibility = 'visible';
        scCal.style.opacity = 1;
        scCal.style.maxHeight = 400+'px';
    }else{
        scCal.style.display = 'visible';
        scCal.style.opacity = 0;
        scCal.style.maxHeight = 0;
        scMode.checked = false;
    }
}

// ---Event listeners for basic calculator---

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
    if(!opDis || !expDis) return;
    isPeriod = false;
    basicCalculation();
    opDis = result;
    expDis = '';
    result = '';
    updateDisplay();
});

// ---Event listeners for other elements---

// For dark Mode
darkMode.addEventListener('change', activityDark);

// For drag and drop
wrapper.addEventListener('dragstart', function(){
    setTimeout(()=>this.className = 'invisible',0);
});

wrapper.addEventListener('dragend', function(){
    this.className = 'wrapper';
    activityDark();
});

document.body.addEventListener('dragover', function(e){
    e.preventDefault();
    wrapper.style.position = "absolute";
    wrapper.style.marginLeft = e.clientX + "px";
    wrapper.style.marginTop = e.clientY + "px";
});

// Window load
window.addEventListener('load', function(){
    activityDark();
    activateScmode();
    limitDrag();
});

// For scientifc mode
scMode.addEventListener('change', activateScmode);


// ---Direct function calling---
// Update time
setInterval(timeUpdate, 1000);



