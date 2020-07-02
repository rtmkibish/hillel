function launchTreeCreation() {

  const treeHeight = +prompt("What is the tree height?");
  const treeSymbol = prompt("What is the symbol to make the tree?");

  alert( getXmasTree(treeHeight, treeSymbol) );
}

function getXmasTree(treeHeight, symbol) {

  if (treeHeight !== treeHeight || typeof(treeHeight) !== "number") {
    throw new Error("Type mismatch, height should be a number type!");
  } else if ( typeof(symbol) !== "string" || symbol.length > 1) {
    throw new Error("The 'symbol' argument should be one character long!");
  }

  let tree = "";
  let starNumber  = 1;
  let counter = 0;
  let whiteSpaceNumber = treeHeight - starNumber;

  while (counter < treeHeight) {
    tree += " ".repeat(whiteSpaceNumber) + symbol.repeat(starNumber) + "\n";

    starNumber  += 2;
    counter++;
    whiteSpaceNumber--;
  }
  return tree;
}

// module.exports = { getXmasTree }