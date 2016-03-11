function cashRegister() {

  var display = 0;
  var balance = 0;
  var decimalMode = false;

  function getDisplay(){
    return display;
  }

  function setDisplay(num){

    if(num === "00"){
      display = display * 100;
    }

    else {

      var newNum = parseInt(num);

      if(display === 0) {
        display = newNum;
      }
      else {
        display = display * 10;
        display = display + newNum;
      }

    }
  }

  function clearDisplay(){
    display = 0;
  }

  function getBalance(){
    display = balance;
 }

  function depositCash(){
    balance += display;
 }

 function withdrawCash(){
    balance -= display;
 }

 function setDecimalMode(){
    decimalMode = true;
 }

  return{
    getDisplay: getDisplay,
    setDisplay: setDisplay,
    clearDisplay: clearDisplay,
    getBalance: getBalance,
    depositCash: depositCash,
    withdrawCash: withdrawCash,
    setDecimalMode: setDecimalMode
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
  updateDisplay();
};

document.getElementById("get balance").onclick = function() {
  CR.getBalance();
  updateDisplay();
};

document.getElementById("deposit cash").onclick = function() {
  CR.depositCash();

  alert(CR.getDisplay() + " Deposited");

  CR.clearDisplay();
  updateDisplay();
};

document.getElementById("withdraw cash").onclick = function() {
  CR.withdrawCash();

  alert(CR.getDisplay() + " Withdrawn");

  CR.clearDisplay();
  updateDisplay();
};

document.getElementById("decimal").onclick = function() {
  CR.setDecimalMode();
};

updateDisplay();




