const { bind } = require("./index");

describe("The bind function tests", () => {
  test("1", () => {
    const test = {phrase: "hello world"};
    function fn() {
      return this.phrase
    }
    const returnPhrase = bind(test, fn);
    expect(returnPhrase()).toBe("hello world");
  });

  test("2", () => {
    const test = {phrase: "hello world"};
    function fn(a, b) {
      return `${this.phrase}, ${a}, ${b}`
    }
    const returnPhrase = bind(test, fn);
    expect(returnPhrase(1, 2)).toBe("hello world, 1, 2");
  });

  test("3", () => {
    const test = {phrase: "hello world"};
    function fn(a, b) {
      return `${this.phrase}, ${a}, ${b}`;
    }
    const returnPhrase = bind(test, fn, [0]);
    expect(returnPhrase(17, 2)).toBe("hello world, 0, 17");
  });
});