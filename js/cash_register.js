function cashRegister() {

  var display = [0, 0];
  var balance = 0;
  var decimalMode = false;


  function getDisplay(){
    return display[0] + "." + display[1];
  }

  function setDisplay(num){

    var newNum;

    if (decimalMode === false){

      if(num === "00"){
        display[0] = display[0] * 100;
      }

      else {

      newNum = parseInt(num);

        if(display[0] === 0) {
          display[0] = newNum;
        }
        else {
          display[0] = display[0] * 10;
          display[0] = display[0] + newNum;
        }

      }
    }

    else {
            if(num === "00"){
        display[1] = display[1] * 100;
      }

      else {

      newNum = parseInt(num);

        if(display[1] === 0) {
          display[1] = newNum;
        }
        else {
          display[1] = display[1] * 10;
          display[1] = display[1] + newNum;
        }

      }
    }


  }

  function clearDisplay(){
    display[0] = 0;
    display[1] = 0;
    decimalMode = false;
  }

  function getBalance(){
    display[0] = balance.toString().split(".")[0];
    display[1] = balance.toString().split(".")[1];
    decimalMode = false;
 }

  function depositCash(){
    balance += parseFloat(display[0] + "."  + display[1]);
    decimalMode = false;
 }

 function withdrawCash(){
    balance -= display[0];
    decimalMode = false;
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




