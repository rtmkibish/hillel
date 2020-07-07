function padString(targetString, finalLength, symbol, addToEnd = true) {
  if ( typeof(targetString) !== "string" ) {
    throw new Error("The target string must be a string type!");
  }

  if ( typeof(finalLength) !== "number" ) {
    throw new Error("The final length must be a number!");
  } else if (finalLength - parseInt(finalLength) > 0 ||
            isNaN(finalLength) ||
            !isFinite(finalLength)
            ) {
    throw new Error("The final length must be an integer!");
  } else if (finalLength < 0) {
    throw new Error("The final length must be a positive number or zero!");
  }

  if ( typeof(symbol) !== "string") {
    throw new Error("The filler symbol must be a string!");
  } else if (symbol.length > 1) {
    throw new Error("The filler symbol cannot be more than 1 character long!");
  } else if (symbol.length === 0) {
    throw new Error("The symbol filler cannot be an empty string!");
  }

  if ( typeof(addToEnd) !== "boolean") {
    throw new Error("The addToEnd argument must be a boolean!");
  }

  if (targetString.length >= finalLength) {
    return targetString;
  } else if (addToEnd) {
    return targetString + symbol.repeat(finalLength - targetString.length);
  } else {
    return symbol.repeat(finalLength - targetString.length) + targetString
  }
}

function isNanBigIntSafe(value) {
  try {
    if (isNaN(value)) {
      return true;
    }
    return false;
  } catch (TypeError) {
    return false;
  }
}

function isInfinityBigIntSafe(value) {
  try {
    if (!isFinite(value)) {
      return true;
    }
    return false;
  } catch (TypeError) {
    return false;
  }
}

function getResult(leftOperand, rightOperand, operator) {
  if ( typeof(leftOperand) === "bigint" && typeof(rightOperand) !== "bigint") {
    throw new Error("The first and the second argument must be the same type: Number or BigInt!");
  } else if ( typeof(leftOperand) !== "number" && typeof(leftOperand) !== "bigint") {
    throw new Error("The first argument must be a number!");
  } else if ( isNanBigIntSafe(leftOperand) || isInfinityBigIntSafe(leftOperand) ) {
    throw new Error("The first argument must not be one of the following types: NaN, Infinity, -Infinity!");
  }

  if ( typeof(leftOperand) !== "bigint" && typeof(rightOperand) === "bigint") {
    throw new Error("The second and the second argument must be the same type: Number or BigInt!");
  } else if ( typeof(rightOperand) !== "number" && typeof(rightOperand) !== "bigint") {
    throw new Error("The second argument must be a number!");
  } else if ( isNanBigIntSafe(rightOperand) || isInfinityBigIntSafe(rightOperand) ) {
    throw new Error("The second argument must not be one of the following types: NaN, Infinity, -Infinity!");
  }

  switch (operator) {
    case "+":
      return leftOperand + rightOperand;
    case "-":
      return leftOperand - rightOperand;
    case "*":
      return leftOperand * rightOperand;
    case "/":
      return leftOperand / rightOperand;
    case "**":
      return leftOperand ** rightOperand;
    case "%":
      return leftOperand % rightOperand;
    default:
      throw new Error("The operator argument must be one of the following types: + | - | * | / | ** | % !");
  }
}

function isCharPresent(string, symbol) {
  if ( typeof(string) !== "string") {
    throw new Error("The first arguments must be a string!");
  }

  if ( typeof(symbol) !== "string") {
    throw new Error("The second arguments must be a string!"); 
  } else if ( symbol.length != 1) {
    throw new Error("The second arguments must be one character long!");
  }

  for ( let i = 0; i < string.length; i++) {
    if (string[i] === symbol) return true;
  }
  return false;
}

function charIndexOf(string, symbol) {
  if ( typeof(string) !== "string") {
    throw new Error("The first argument must be a string!");
  }

  if ( typeof(symbol) !== "string") {
    throw new Error("The second argument must be a string!");
  } else if (symbol.length != 1) {
    throw new Error("The second argument must be one character long!");
  }

  for ( let i = 0; i < string.length; i++) {
    if (string[i] === symbol) return i;
  }
  return -1;
}


let padStringBtn = document.querySelector(".padString");
let getResultBtn = document.querySelector(".getResult");
let isCharPresentBtn = document.querySelector(".isCharPresent");
let charIndexOfBtn = document.querySelector(".charIndexOf");

padStringBtn.addEventListener("click", (event) => {
  const string = prompt("Provide a string");
  const finalStringLength = +prompt("Provide a length for the string");
  const symbol = prompt("Provide a symbol");
  const flag = confirm("Add symbols to the end?");

  alert(padString(string, finalStringLength, symbol, flag));
});

getResultBtn.addEventListener("click", (event) => {
  const leftOperand = +prompt("Provide a left operand");
  const rightOperand = +prompt("Provide a right operant");
  const operator = prompt("Provide an operator");

  alert(getResult(leftOperand, rightOperand, operator));
});

isCharPresentBtn.addEventListener("click", (event) => {
  const string = prompt("Provide a string");
  const symbol = prompt("Provide a symbol");

  alert(isCharPresent(string, symbol));
});

charIndexOfBtn.addEventListener("click", (event) => {
  const string = prompt("Provide a string");
  const symbol = prompt("Provide a symbol");

  alert(charIndexOf(string, symbol));
});


// module.exports = { padString, getResult, isCharPresent, charIndexOf }