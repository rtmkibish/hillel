function getPalindrome(n, counter = 0) {
  const strN = String(n);
  const reversedStrN = strN.split("").reverse().join("");
  if(strN == reversedStrN) {
    return {"palindrome": +strN, "steps": counter};
  } else {
    return getPalindrome(+strN + +reversedStrN, ++counter);
  }
}

module.exports = { getPalindrome };