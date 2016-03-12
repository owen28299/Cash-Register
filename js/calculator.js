
var calculatorModule = function(){

  var total = 0;
  var memory = 0;

  var setMemory = function(num){
    memory = num;
  };

  var setTotal = function(num){
    total = num;
  };

  var getTotal = function() {
    return total;
  };

  var add = function(x) {
    total += x;
    total += memory;

  };

  var subtract = function(x){
    total -= x;
    total += memory;
  };


  var multiply = function(x) {
    total = 1;
    total *= x;
    total *= memory;
   };


  var divide = function(x) {
    total = memory;
    total /= x;
   };


  return {
    setMemory : setMemory,
    setTotal : setTotal,
    getTotal : getTotal,
    add: add,
    subtract: subtract,
    multiply : multiply,
    divide : divide,
  };

};