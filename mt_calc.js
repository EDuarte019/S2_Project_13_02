"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 2

   Author: Evelyn Duarte
   Date:  3/25/19 
   
   Filename: mt_calc.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers
      
   buttonClick(e)
      Adds functions to the buttons clicked within the calcutlor
      
   calcKeys(e)
      Adds functions to key pressed within the calculator window 
      
   eraseChar(textStr)
      Erases the last character from the text string, textStr
      
   evalEq(textStr, decimals) 
      Evaluates the equation in textStr, returning a value to the number of decimals specified by the decimals parameter

   lastEq(textStr) 
      Returns the previous expression from the list of expressions in the textStr parameter

*/
//run the init function when the page loads.
window.onload = init;

//the init function has a calcButton variabe that contains an object collection of calcButton. The for loop runs the buttonClick function when the click event happens. The calcKey runs when the keydown event happens.
function init() {
      var calcButtons = document.getElementsByClassName("calcButton");
      for (var i = 0; i < calcButtons.length; i++) {
            calcButtons[i].onclick = buttonClick;
      }
      document.getElementById("calcWindow").onkeydown = calcKeys;
}
//The function buttonClick has a variable set to their class value. ButtonValue has it set to target the value. Also, a switch case that gives the value and the variable that is set to change.
function buttonClick(e) {
      var calcValue = document.getElementById("calcWindow").value;
      var calcDecimal = document.getElementById("decimals").value;
      var buttonValue = e.target.value;
      switch (buttonValue) {
            case "del":
                  calcValue = "";
                  break;
            case "bksp":
                  calcValue = eraseChar(calcValue);
                  break;
            case "enter":
                  calcValue += " = " + evalEq(calcValue, calcDecimal) + "\n";
                  break;
            case "prev":
                  calcValue += lastEq(calcValue) + "\n"
                  break;
            default:
                  calcValue += buttonValue;
                  break;
      }
      //the vaue is set to text area box calcValue. the focus puts the cursor focus within the calculator window.
      document.getElementById("calcWindow").value = calcValue;
      document.getElementById("calcWindow").focus();
}
// the function calcKeys has the same declaration as the function buttonClick. Then another switch case is placed for the event key except this case switch will prevent the default from happening.
function calcKeys(e) {
      var calcValue = document.getElementById("calcWindow").value;
      var calcDecimal = document.getElementById("decimals").value;
      switch (e.key) {
            case "Delete":
                  calcValue = "";
                  break;
            case "Enter":
                  calcValue += " = " + evalEq(calcValue, calcDecimal);
                  break;
            case "ArrowUp":
                  calcValue += lastEq(calcValue);
                  e.preventDefault();
      }
      //The calcValue is equal to the value attribute of the calcWindow.
      document.getElementById("calcWindow").value = calcValue;
}


/* ===================================================================== */

function eraseChar(textStr) {
      return textStr.substr(0, textStr.length - 1);
}

function evalEq(textStr, decimals) {
      var lines = textStr.split(/\r?\n/);
      var lastLine = lines[lines.length - 1];
      var eqValue = eval(lastLine);
      return eqValue.toFixed(decimals);
}

function lastEq(textStr) {
      var lines = textStr.split(/\r?\n/);
      var lastExp = lines[lines.length - 2];
      return lastExp.substr(0, lastExp.indexOf("=")).trim();
}