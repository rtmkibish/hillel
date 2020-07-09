function odd(array) {
  const numberArray = getNumberArray(array);
  const arrayOfOdd = [];

  for (let i = 0; i < numberArray.length; i++) {
    if (array[i] % 2) arrayOfOdd.push(array[i]);
  }

  return arrayOfOdd;
}

function even(array) {
  const numberArray = getNumberArray(array);
  const arrayOfEven = [];

  for (let i = 0; i < numberArray.length; i++) {
    if (array[i] % 2 === 0) arrayOfEven.push(array[i]);
  }

  return arrayOfEven;
}

function flat(array) {
  let flattenedArray = [];
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      for ( let j = 0; j < array[i].length; j++) {
        if ( Number.isSafeInteger(array[i][j]) ) flattenedArray.push(array[i][j]);
      }
    } else if ( Number.isSafeInteger(array[i]) ) flattenedArray.push(array[i]);
  }

  return flattenedArray;
}

// Needed only if used in browser
function getNestedArrayFromUser() {
  const array = [];

  do {
    const rawElements = prompt("Input elements divided by comma");

    if (!rawElements) {
      break;
    }

    const elementsList = rawElements.split(",");
    const numberElements = arrayToNumberArray(elementsList);

    if(numberElements.length <= 1) {
      array.push(numberElements[0]);
    } else {
      array.push(numberElements);
    }

  } while (true);

  return array;
}

function getNumberArray(array) {
  const safeArray = [];

  for (let i = 0; i < array.length; i++) {
    if (typeof(array[i]) === "number" && !isNaN(array[i]) && isFinite(array[i])) {
      safeArray.push(array[i]);
    }
  }

  return safeArray;
}

function arrayToNumberArray(array) {
  const convertedArray = [];

  for (let i = 0; i < array.length; i++) {
    if (Number(array[i])) convertedArray.push(Number(array[i]));
  }
  return convertedArray;
}

let oddBtn = document.querySelector("#oddBtn");
let evenBtn = document.querySelector("#evenBtn");
let flatBtn = document.querySelector("#flatBtn");

oddBtn.addEventListener("click", event => {
  const userValues = prompt("Provide numbers divided by comma", "").split(",");
  const numberArray = arrayToNumberArray(userValues);
  const oddNumbers = odd(numberArray);

  alert(`Your odd only numbers: ${oddNumbers.join(", ")}`);
});

evenBtn.addEventListener("click", event => {
  const userValues = prompt("Provide numbers divided by comma", "").split(",");
  const numberArray = arrayToNumberArray(userValues);
  const evenNumbers = even(numberArray);

  alert(`Your eeven only numbers: ${evenNumbers.join(", ")}`);
});

flatBtn.addEventListener("click", event => {
  const array = getNestedArrayFromUser();
  const flattenedArray = flat(array);

  alert(`Your flattened array: ${flattenedArray.join(", ")}`);
});


// module.exports = { odd, even, flat }