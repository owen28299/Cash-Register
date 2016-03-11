function cashRegister() {

  var total = 0;

  function getDisplay(){
    return total;
  }

  function setDisplay(num){
    var newNum = parseInt(num);

    if(total === 0) {
      total = newNum;
    }
    else {
      total = total * 10;
      total = total + newNum;
    }
  }

  return{
    getDisplay: getDisplay,
    setDisplay: setDisplay

  };

}


var CR = cashRegister();
updateDisplay();

//CR.setDisplay(7);

var setDisp = function(){
    CR.setDisplay(this.innerHTML);
    updateDisplay();
};

for (var i = 0; i <= 9; i++){
  document.getElementById(i).onclick = setDisp;
}

function updateDisplay() {
  document.getElementById("display").innerHTML = CR.getDisplay();
}


