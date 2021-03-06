// hash to hold all the possible characters for roman numberals(keys) and arabic numbers(values)
var romanNumeralsTable = {
   M: 1000,
  CM: 900,
   D: 500,
  CD: 400,
   C: 100,
  XC: 90,
   L: 50,
  XL: 40,
   X: 10,
  IX: 9,
   V: 5,
  IV: 4,
   I: 1
};

// an array to hold the keys(roman numberals) of roman numberal table
var romanNumerals = Object.keys(romanNumeralsTable);
var sortedRomanNumerals = romanNumerals.slice().sort(function(a,b){
  return b.length - a.length;
})
// function to to converter arabic numbers to roman numberals
function romanNumeralsConverter(arabicNumber){
  // empty string to hold the roman numberal that will be built base off the user input
  var result = "";
  // For each roman numberal in the roman numberals array
  romanNumerals.forEach(function(romanNumeral){

    // while arabic number is greater than the value at the key in the hash
    // Ex. (arabicNumber === 349)  >= (romanNumeralTable[romanNumeral] === 1000, 900, 500, 400, 100, etc.)
    while(arabicNumber >= romanNumeralsTable[romanNumeral]){
      // add that key to the string result
      result += romanNumeral;
      // inputted arabic number is substracted by the value of that key
      arabicNumber -= romanNumeralsTable[romanNumeral];
    }
  });
  return result;
}

// Convert romam numberal to arabic number
function arabicNumberConverter(romanNumeral = ""){
  var result = 0;
  return sortedRomanNumerals.reduce(function(arabicNumber, romanCharacter){
    while(romanNumeral.includes(romanCharacter)){
      result += romanNumeralsTable[romanCharacter];
      romanNumeral = romanNumeral.replace(romanCharacter, "");
    }
    return result;
  },0)
}

$(document).ready(function(){
  $("span.roman, span.arabic").hide();

  $("form#number-form").submit(function(event){
    event.preventDefault();
    $(this).find(".form-group").removeClass("has-error");
    $("p.number-error").hide();
    var numberInput = parseInt($("input#number").val());

    if (isNaN(numberInput)){
      $(this).find(".form-group").addClass("has-error");
      $("p.number-error").show();
      return;
    }

    $("span.roman").text(romanNumeralsConverter(numberInput)).show();
    $("input#number").val("");
  });

  $("#clear-a").click(function(event){
    event.preventDefault();
    $("span.roman").text("").hide();
  })

  $("form#arabic-form").submit(function(event){
    event.preventDefault();
    $(this).find(".form-group").removeClass("has-error");
    $("p.roman-error").hide();
    var romanInput = $("input#roman").val().toUpperCase();

    if (romanInput.match(/[^MDCLXVI]/)){
      $(this).find(".form-group").addClass("has-error");
      $("p.roman-error").show();
      return;
    }
    $("span.arabic").text(arabicNumberConverter(romanInput)).show();
    $("input#roman").val("");
  });

  $("#clear-r").click(function(event){
    event.preventDefault();
    $("span.arabic").text("").hide();
  })
});
