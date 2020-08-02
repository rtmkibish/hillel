const { getPalindrome } = require('./index');

test("1: 66 -> 66, 0", () => {
  expect(getPalindrome(66)).toEqual({"palindrome": 66, "steps": 0});
});

test("2: 96  -> 4884, 4", () => {
  expect(getPalindrome(96)).toEqual({"palindrome": 4884, "steps": 4});
});

test("3: 196 -> RangeError", () => {
  expect(() => {
    getPalindrome(196);
  }).toThrow(RangeError);
});