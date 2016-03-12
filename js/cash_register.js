function cashRegister() {

  var calcStatus = {
    display : [0, 0]
  };

  var calculator = calculatorModule();

  var balance = 0;
  var decimalMode = false;
  var zeroAfterDecimal = false;
  var operatorStatus = false;

  function setOperatorOn (state){
    operatorStatus = state;
  }

  function getOperatorStatus(){
    return operatorStatus;
  }

  function getDisplay(){
    if(calcStatus.display.length === 2){
      return parseFloat(calcStatus.display[0] + "." + calcStatus.display[1]).toFixed(2);
    }
    else{
      var zeroes = calcStatus.display.slice(2, calcStatus.display.length).join("");
      return parseFloat(calcStatus.display[0] + "." + zeroes + calcStatus.display[1]).toFixed(2);
    }
  }

  function setDisplay(num){

    if (calcStatus.display.length < 4 &&
      ((zeroAfterDecimal === false && calcStatus.display[1] < 10) ||
      (zeroAfterDecimal === true && calcStatus.display[1] < 10))
    ){

      var newNum;

      if (decimalMode === false){

        if(num === "00"){
          calcStatus.display[0] = calcStatus.display[0] * 100;
        }

        else {

        newNum = parseInt(num);

          if(calcStatus.display[0] === 0) {
            calcStatus.display[0] = newNum;
          }
          else {
            calcStatus.display[0] = calcStatus.display[0] * 10;
            calcStatus.display[0] = calcStatus.display[0] + newNum;
          }

        }
      }

      //decimal mode is true

      else {
        if(num === "00"){
          calcStatus.display[1] = calcStatus.display[1];
        }

        //zeroAfterDecimal is true
        if (num === "0" && parseInt(calcStatus.display[1]) === 0){
          zeroAfterDecimal = true;
          calcStatus.display.push(0);
        }

        else {

          newNum = parseInt(num);

            if(calcStatus.display[1] === 0) {
              calcStatus.display[1] = newNum;
            }
            else {
              calcStatus.display[1] = calcStatus.display[1] * 10;
              calcStatus.display[1] = calcStatus.display[1] + newNum;
            }

        }
      }

    }
  }

  function clearDisplay(){
    calcStatus.display = [0, 0];
    decimalMode = false;
    zeroAfterDecimal = false;
    calculator.setTotal(0);
  }

  function getBalance(){

    if(balance !== 0 || display[0] !== 0 || display[1] !== 0){
      calcStatus.display[0] = balance.toString().split(".")[0];
      calcStatus.display[1] = balance.toString().split(".")[1];
      decimalMode = false;
    }

    if(balance === 0){
      clearDisplay();
    }

 }

  function depositCash(){
    var zeroes = calcStatus.display.slice(2, calcStatus.display.length).join("");
    balance += parseFloat(calcStatus.display[0] + "."  + zeroes + calcStatus.display[1]);
    decimalMode = false;
 }

 function withdrawCash(){
    var zeroes = calcStatus.display.slice(2, calcStatus.display.length).join("");
    balance -= parseFloat(calcStatus.display[0] + "."  + zeroes + calcStatus.display[1]);
    decimalMode = false;
 }

 function setDecimalMode(){
    decimalMode = true;
 }

 function storeToMemory(num){
    calculator.setMemory(parseFloat(num));
 }

 function setDisplayFromCalc(total){

    calcStatus.display[0] = total.toString().split(".")[0];

    calcStatus.display[1] = total.toString().split(".")[1];

 }

 function processOperation(){
  var operation =  document.getElementById('operator').innerHTML;
  var passedDisplay;
  var returnedValue;
  var newTotal;

  switch(operation){
    case "+":
      passedDisplay = (parseFloat(getDisplay()));

      calculator.add(passedDisplay);

      returnedValue = calculator.getTotal();

      newTotal = returnedValue;

      setDisplayFromCalc(newTotal);
      break;

    case "-":
      passedDisplay = (parseFloat(getDisplay()));

      calculator.subtract(passedDisplay);

      returnedValue = calculator.getTotal();

      newTotal = returnedValue;

      setDisplayFromCalc(newTotal);
      break;

    case "*":
      passedDisplay = (parseFloat(getDisplay()));

      calculator.multiply(passedDisplay);

      returnedValue = calculator.getTotal();

      newTotal = returnedValue;

      setDisplayFromCalc(newTotal);
      break;

    case "/":
      passedDisplay = (parseFloat(getDisplay()));

      calculator.divide(passedDisplay);

      returnedValue = calculator.getTotal();

      newTotal = returnedValue;

      setDisplayFromCalc(newTotal);
      break;

  }

 }

  return{
    setOperatorOn: setOperatorOn,
    getOperatorStatus: getOperatorStatus,
    getDisplay: getDisplay,
    setDisplay: setDisplay,
    clearDisplay: clearDisplay,
    getBalance: getBalance,
    depositCash: depositCash,
    withdrawCash: withdrawCash,
    setDecimalMode: setDecimalMode,
    storeToMemory: storeToMemory,
    processOperation: processOperation
  };

}

var CR = cashRegister();

var setDisp = function(){
    CR.setDisplay(this.innerHTML);
    updateDisplay();
};

var setBalance = function(){
    CR.getBalance();
    updateDisplay();
};

for (var i = 0; i <= 9; i++){
  document.getElementById(i).onclick = setDisp;
}

document.getElementById("00").onclick = setDisp;

function updateDisplay() {
  document.getElementById("display").innerHTML = CR.getDisplay();
}

document.getElementById("clear").onclick = function() {
  CR.clearDisplay();
  document.getElementById('operator').innerHTML = "";
  CR.setOperatorOn(false);
  updateDisplay();
};

document.getElementById("get balance").onclick = function() {
  CR.getBalance();
  document.getElementById('operator').innerHTML = "";
  CR.setOperatorOn(false);
  updateDisplay();
};

document.getElementById("deposit cash").onclick = function() {
  CR.depositCash();

  alert(CR.getDisplay() + " Deposited");

  CR.clearDisplay();
  document.getElementById('operator').innerHTML = "";
  CR.setOperatorOn(false);
  updateDisplay();
};

document.getElementById("withdraw cash").onclick = function() {
  CR.withdrawCash();

  alert(CR.getDisplay() + " Withdrawn");

  CR.clearDisplay();
  document.getElementById('operator').innerHTML = "";
  CR.setOperatorOn(false);
  updateDisplay();
};

document.getElementById("decimal").onclick = function() {
  CR.setDecimalMode();
};

document.getElementById("plus").onclick = function() {
  if(CR.getOperatorStatus() === false){
    document.getElementById('operator').innerHTML = "+";
    CR.storeToMemory(CR.getDisplay());
    CR.clearDisplay();
    CR.setOperatorOn(true);
    }
};

document.getElementById("minus").onclick = function() {
  if(CR.getOperatorStatus() === false){
    document.getElementById('operator').innerHTML = "-";
    CR.storeToMemory(CR.getDisplay());
    CR.clearDisplay();
    CR.setOperatorOn(true);
    }
};

document.getElementById("times").onclick = function() {
  if(CR.getOperatorStatus() === false){
    document.getElementById('operator').innerHTML = "*";

    console.log(CR.getDisplay());
    CR.storeToMemory(CR.getDisplay());

    CR.clearDisplay();
    CR.setOperatorOn(true);
    }
};

document.getElementById("divide").onclick = function() {
  if(CR.getOperatorStatus() === false){
    document.getElementById('operator').innerHTML = "/";

    console.log(CR.getDisplay());
    CR.storeToMemory(CR.getDisplay());

    CR.clearDisplay();
    CR.setOperatorOn(true);
    }
};

document.getElementById("equal").onclick = function() {
  CR.processOperation();
  document.getElementById('operator').innerHTML = "=";
  CR.setOperatorOn(false);
  updateDisplay();
};

updateDisplay();




