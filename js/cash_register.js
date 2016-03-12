function cashRegister() {

  var display = [0, 0];
  var balance = 0;
  var decimalMode = false;
  var zeroAfterDecimal = false;

  function getDisplay(){
    if(display.length === 2){
      return parseFloat(display[0] + "." + display[1]).toFixed(2);
    }
    else{
      var zeroes = display.slice(2, display.length).join("");
      return parseFloat(display[0] + "." + zeroes + display[1]).toFixed(2);
    }
  }

  function setDisplay(num){

    if (display.length < 4 &&
      ((zeroAfterDecimal === false && display[1] < 9) ||
      (zeroAfterDecimal === true && display[1] < 9))
    ){

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

      //decimal mode is true

      else {
        if(num === "00"){
          display[1] = display[1];
        }

        //zeroAfterDecimal is true
        if (num === "0" && parseInt(display[1]) === 0){
          zeroAfterDecimal = true;
          display.push(0);
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
  }

  function clearDisplay(){
    display = [0, 0];
    decimalMode = false;
    zeroAfterDecimal = false;
  }

  function getBalance(){

    if(balance !== 0){
      display[0] = balance.toString().split(".")[0];
      display[1] = balance.toString().split(".")[1];
      decimalMode = false;
    }
 }

  function depositCash(){
    var zeroes = display.slice(2, display.length).join("");
    balance += parseFloat(display[0] + "."  + zeroes + display[1]);
    decimalMode = false;
 }

 function withdrawCash(){
    var zeroes = display.slice(2, display.length).join("");
    balance -= parseFloat(display[0] + "."  + zeroes + display[1]);
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




