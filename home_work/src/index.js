var userAge = +prompt("Каков Ваш возраст?");
var userAge2LastDigits = userAge % 100;
var userAge1LastDigit = userAge % 10;
var yearDescription;

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

alert(`Вам ${userAge} ${yearDescription}`);

