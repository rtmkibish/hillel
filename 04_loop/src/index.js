var treeHeight = +prompt("Какая высота дерева?");
var tree = "";

for (var starNumber  = 1, counter = 0, whiteSpaceNumber = treeHeight - starNumber;
     counter < treeHeight;
     starNumber  += 2, counter++, whiteSpaceNumber--
    ) {
  tree += " ".repeat(whiteSpaceNumber) + "*".repeat(starNumber) + "\n";
}

alert(tree);