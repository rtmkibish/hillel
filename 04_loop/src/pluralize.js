function getPluralAge(userAge) {

  if (userAge !== userAge || typeof(userAge) !== "number") {
    throw new Error("Возраст должен быть числом!");
  }

  const userAge2LastDigits = userAge % 100;
  const userAge1LastDigit = userAge % 10;
  let yearDescription;

  if (
      (userAge2LastDigits >= 11 && userAge2LastDigits <= 19) ||
      (userAge1LastDigit >= 5 && userAge1LastDigit <= 9) ||
      userAge1LastDigit == 0
      ) {
    yearDescription = "лет";
  } else if (userAge1LastDigit >= 2 && userAge1LastDigit <= 4) {
    yearDescription = "года";
  } else if (userAge1LastDigit == 1) {
    yearDescription = "год";
  }

 return yearDescription;
}

function launchPluralize() {
  const age = +prompt("Каков Ваш возрас?");

  alert(`Вам ${age} ${getPluralAge(age)}`);
}

// module.exports = { getPluralAge }