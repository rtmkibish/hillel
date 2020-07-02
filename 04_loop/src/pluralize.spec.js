const { getPluralAge } = require("./pluralize");

test("Год", () => {
  for (let i = 0; i <= 1000; i++) {
    if (i % 10 === 1 && i % 100 !== 11) {
      expect(getPluralAge(i)).toBe("год");
    }
  }
});

test("Года", () => {
  for (let i = 0; i <= 1000; i++) {
    if (i % 10 >= 2 && i % 10 <= 4 &&
        !(i % 100 >= 12 && i % 100 <= 20)
      ) {
      expect(getPluralAge(i)).toBe("года");
    }
  }
});

test("Лет", () => {
  for (let i = 0; i <= 1000; i++) {
    if (
      (i % 100 >= 11 && i % 100 <= 19) ||
      (i % 10 >= 5 && i % 10 <= 9) ||
      i % 10 == 0
      ) {
        expect(getPluralAge(i)).toBe("лет");
      }
  }
});
