
var Calculator = (function(){

  var total = 0;

  var load = function(x) {
    total = x;
    return total;
  };

  var getTotal = function() {
    return total;
  };

  var add = function(x) {
    total += x;
  };

  var subtract = function(x){
    total -= x;
  };


  var multiply = function(x) {
    total *= x;
   };


  var divide = function(x) {
    total /= x;
   };


  return {
    load : load,
    getTotal : getTotal,
    add: add,
    subtract: subtract,
    multiply : multiply,
    divide : divide,
  };

});

module.exports = Calculator;