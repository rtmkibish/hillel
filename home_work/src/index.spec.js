const { padString, getResult, isCharPresent, charIndexOf } = require("./index");

describe("padString test suite", () => {

    describe("Positive test cases", () => {

        test("1: ('aaa', 8, *, true) => 'aaa*****'", () => {
            expect(padString("aaa", 8, "*", true)).toBe("aaa*****");
        });
        
        test("2: ('aaa', 8, *, true) => '*****aaa'", () => {
            expect(padString("aaa", 8, "*", false)).toBe("*****aaa");
        });
        
        test("3: ('a', 5, %) => 'a%%%%'", () => {
            expect(padString("a", 5, "%")).toBe("a%%%%");
        });
        
        test("4: ('aaaaaa', 4, ^, true) => 'aaaaaa", () => {
            expect(padString("aaaaaa", 4, "^", true)).toBe("aaaaaa");
        });
        
        test("5: ('aaaaaa', 4, ^, false) => 'aaaaaa", () => {
            expect(padString("aaaaaa", 4, "^", false)).toBe("aaaaaa");
        });
        
        test("6: (empty string, 5, '@', true) => '@@@@@'", () => {
            expect(padString('', 5, "@", true)).toBe("@@@@@");
        });
        
        test("7: (empty string, 5, '@', false) => '@@@@@'", () => {
            expect(padString('', 5, "@", false)).toBe("@@@@@");
        });
        
        test("8: (empty string, 5, '@') => '@@@@@'", () => {
            expect(padString('', 5, "@")).toBe("@@@@@");
        });
        
        test("9: ('aaa', 9, '*', undefined) => Error", () => {
            expect( () => {
                padString("aaa", 9, "*", undefined)
            }).not.toThrow("The addToEnd argument must be a boolean!");
        });
        
        test("10: ('aaa', 9, '*', undefined) => 'aaa******'", () => {
            expect(padString("aaa", 9, "*", undefined)).toBe("aaa******");
        });

        test("11: ('', 0, '*', true) => ''", () => {
            expect(padString("", 0, "*", true)).toBe("");
        });
    });

    describe("Negative test casese for the 1 argument", () => {

        test("12: (5, 5, *, false) => Error", () => {
            expect( () => {
                padString(5, 5, '*', false)
            }).toThrow("The target string must be a string type!");
        });
        
        test("13: (null, 5, *, false) => Error", () => {
            expect( () => {
                padString(null, 5, '*', false)
            }).toThrow("The target string must be a string type!");
        });
        
        test("14: (undefined, 5, *, false) => Error", () => {
            expect( () => {
                padString(undefined, 5, '*', false)
            }).toThrow("The target string must be a string type!");
        });
        
        test("15: ({}, 5, *, false) => Error", () => {
            expect( () => {
                padString({}, 5, '*', false)
            }).toThrow("The target string must be a string type!");
        });
        
        test("16: (true, 5, *, false) => Error", () => {
            expect( () => {
                padString(true, 5, '*', false)
            }).toThrow("The target string must be a string type!");
        });
        
        test("17: (Symbol(), 5, *, false) => Error", () => {
            expect( () => {
                padString(Symbol(), 5, '*', false)
            }).toThrow("The target string must be a string type!");
        });
        
        test("18: (10n, 5, *, false) => Error", () => {
            expect( () => {
                padString(10n, 5, '*', false)
            }).toThrow("The target string must be a string type!");
        });
    });

    describe("Negative test cases for the 2 argument", () => {

        test("19: ('aaaa', -1, *, false) => Error", () => {
            expect( () => {
                padString("aaaa", -1, '*', false)
            }).toThrow("The final length must be a positive number or zero!");
        });
        
        test("20: ('aaaa', -Infinity, *, false) => Error", () => {
            expect( () => {
                padString("aaaa", -Infinity, '*', false)
            }).toThrow("The final length must be an integer!");
        });
        
        test("21: ('aaaa', Infinity, *, false) => Error", () => {
            expect( () => {
                padString("aaaa", Infinity, '*', false)
            }).toThrow("The final length must be an integer!");
        });
        
        test("22: ('aaaa', NaN, *, false) => Error", () => {
            expect( () => {
                padString("aaaa", Infinity, '*', false)
            }).toThrow("The final length must be an integer!");
        });
        
        test("23: ('aaaa', 0.2, *, false) => Error", () => {
            expect( () => {
                padString("aaaa", 0.2, '*', false)
            }).toThrow("The final length must be an integer!");
        });
        
        test("24: ('aaaa', '', *, false) => Error", () => {
            expect( () => {
                padString("aaaa", "", '*', false)
            }).toThrow("The final length must be a number!");
        });
        
        test("25: ('aaaa', true, *, false) => Error", () => {
            expect( () => {
                padString("aaaa", true, '*', false)
            }).toThrow("The final length must be a number!");
        });
        
        test("26: ('aaaa', null, *, false) => Error", () => {
            expect( () => {
                padString("aaaa", null, '*', false)
            }).toThrow("The final length must be a number!");
        });
        
        test("27: ('aaaa', undefined, *, false) => Error", () => {
            expect( () => {
                padString("aaaa", undefined, '*', false)
            }).toThrow("The final length must be a number!");
        });
        
        test("28: ('aaaa', {}, *, false) => Error", () => {
            expect( () => {
                padString("aaaa", {}, '*', false)
            }).toThrow("The final length must be a number!");
        });
        
        test("29: ('aaaa', Symbol(), *, false) => Error", () => {
            expect( () => {
                padString("aaaa", Symbol(), '*', false)
            }).toThrow("The final length must be a number!");
        });
        
        test("30: ('aaaa', 10n, *, false) => Error", () => {
            expect( () => {
                padString("aaaa", 10n, '*', false)
            }).toThrow("The final length must be a number!");
        });
        
        test("31: ('aaaa', '2', *, false) => Error", () => {
            expect( () => {
                padString("aaaa", "2", '*', false)
            }).toThrow("The final length must be a number!");
        });
    });

    describe("Negative test cases for the 3 argument", () => {

        test("32: ('aaa', 8, '**', true) => Error", () => {
            expect( () => {
                padString("aaa", 8, "**", true)
            }).toThrow("The filler symbol cannot be more than 1 character long!");
        });
        
        test("33: ('aaa', 4, 9, true) => Error", () => {
            expect( () => {
                padString("aaaaaa", 4, 9, true)
            }).toThrow("The filler symbol must be a string!");
        });
        
        test("34: ('aaa', 4, 9n, true) => Error", () => {
            expect( () => {
                padString("aaa", 4, 9n, true)
            }).toThrow("The filler symbol must be a string!");
        });
        
        test("35: ('aaa', 4, null, true) => Error", () => {
            expect( () => {
                padString("aaaaaa", 4, null, true)
            }).toThrow("The filler symbol must be a string!");
        });
        
        test("36: ('aaa', 4, undefined, true) => Error", () => {
            expect( () => {
                padString("aaaaaa", 4, undefined, true)
            }).toThrow("The filler symbol must be a string!");
        });
        
        test("37: ('aaa', 4, false, true) => Error", () => {
            expect( () => {
                padString("aaa", 4, false, true)
            }).toThrow("The filler symbol must be a string!");
        });
        
        test("38: ('aaa', 4, {}, true) => Error", () => {
            expect( () => {
                padString("aaa", 4, {}, true)
            }).toThrow("The filler symbol must be a string!");
        });
        
        test("39: ('aaa', 4, Symbol(), true) => Error", () => {
            expect( () => {
                padString("aaa", 4, Symbol(), true)
            }).toThrow("The filler symbol must be a string!");
        });
        
        test("40: ('aaa', 9, '', false) => Error", () => {
            expect( () => {
                padString("aaaaaa", 9, "", false)
            }).toThrow("The symbol filler cannot be an empty string!");
        });        
    });

    describe("Negative test cases for the 4 argument", () => {

        test("41: ('aaa', 9, '*', 1) => Error", () => {
            expect( () => {
                padString("aaaaaa", 9, "*", 1)
            }).toThrow("The addToEnd argument must be a boolean!");
        });
        
        test("42: ('aaa', 9, '*', 'true') => Error", () => {
            expect( () => {
                padString("aaa", 9, "*", "true")
            }).toThrow("The addToEnd argument must be a boolean!");
        });
        
        test("43: ('aaa', 9, '*', null) => Error", () => {
            expect( () => {
                padString("aaa", 9, "*", null)
            }).toThrow("The addToEnd argument must be a boolean!");
        });
        
        test("44: ('aaa', 9, '*', 10n) => Error", () => {
            expect( () => {
                padString("aaaaaa", 9, "*", 10n)
            }).toThrow("The addToEnd argument must be a boolean!");
        });
        
        test("45: ('aaa', 9, '*', {}) => Error", () => {
            expect( () => {
                padString("aaaaaa", 9, "*", {})
            }).toThrow("The addToEnd argument must be a boolean!");
        });
        
        test("46: ('aaa', 9, '*', Symbol()) => Error", () => {
            expect( () => {
                padString("aaaaaa", 9, "*", Symbol())
            }).toThrow("The addToEnd argument must be a boolean!");
        });
    });
});

describe("getResult test suite", () => {

    describe("Positive test cases", () => {

        test("47: (2, 3, '+') => 5", () => {
            expect(getResult(2, 3, "+")).toBe(5);
        });

        test("48: (2, 3, '*') => 6", () => {
            expect(getResult(2, 3, "*")).toBe(6);
        });

        test("49: (2, 3, '/') => 0.666666", () => {
            expect(getResult(2, 3, "/")).toBeCloseTo(0.666666);
        });

        test("50: (2, 3, '-') => -1", () => {
            expect(getResult(2, 3, "-")).toBe(-1);
        });

        test("51: (2, 3, '**') => 8", () => {
            expect(getResult(2, 3, "**")).toBe(8);
        });

        test("52: (2, 3, '%') => 2", () => {
            expect(getResult(2, 3, "%")).toBe(2);
        });

        test("53: (-2, 3, '+') => 1", () => {
            expect(getResult(-2, 3, "+")).toBe(1);
        });

        test("54: (-2, 3, '*') => -6", () => {
            expect(getResult(-2, 3, "*")).toBe(-6);
        });

        test("55: (-2, 3, '/') => -0.666666", () => {
            expect(getResult(-2, 3, "/")).toBeCloseTo(-0.666666);
        });

        test("56: (-2, 3, '-') => -5", () => {
            expect(getResult(-2, 3, "-")).toBe(-5);
        });

        test("57: (2, -3, '**') => 0.125", () => {
            expect(getResult(2, -3, "**")).toBe(0.125);
        });

        test("58: (-2, 3, '%') => -2", () => {
            expect(getResult(-2, 3, "%")).toBe(-2);
        });

        test("59: (10n, 3n, '+') => 13n", () => {
            expect(getResult(10n, 3n, "+")).toBe(13n);
        });

        test("60: (10n, 3n, '-') => 7n", () => {
            expect(getResult(10n, 3n, "-")).toBe(7n);
        });

        test("61: (10n, 3n, '*') => 30n", () => {
            expect(getResult(10n, 3n, "*")).toBe(30n);
        });

        test("62: (10n, 3n, '/') => 3n", () => {
            expect(getResult(10n, 3n, "/")).toBe(3n);
        });

        test("63: (10n, 3n, '%') => 1n", () => {
            expect(getResult(10n, 3n, "%")).toBe(1n);
        });

        test("64: (-2, 3, '**')) => -8", () => {
            expect(getResult(-2, 3, '**')).toBe(-8);
        });
    });

    describe("Negative test cases for the 1 argument", () => {

        test("65: (undefined, 3, '+') => Error", () => {
            expect( () => {
                getResult(undefined, 3, "+")
            }).toThrow("The first argument must be a number!");
        });

        test("66: (null, 3, '+') => Error", () => {
            expect( () => {
                getResult(null, 3, "+")
            }).toThrow("The first argument must be a number!");
        });

        test("67: ('3', 3, '+') => Error", () => {
            expect( () => {
                getResult("3", 3, "+")
            }).toThrow("The first argument must be a number!");
        });

        test("68: (3n, 3, '+') => Error", () => {
            expect( () => {
                getResult(3n, 3, "+")
            }).toThrow("The first and the second argument must be the same type: Number or BigInt!");
        });

        test("69: (true, 3, '+') => Error", () => {
            expect( () => {
                getResult(true, 3, "+")
            }).toThrow("The first argument must be a number!");
        });

        test("70: (Symbol(), 3, '+') => Error", () => {
            expect( () => {
                getResult(Symbol(), 3, "+")
            }).toThrow("The first argument must be a number!");
        });

        test("71: ({}, 3, '+') => Error", () => {
            expect( () => {
                getResult({}, 3, "+")
            }).toThrow("The first argument must be a number!");
        });

        test("72: (NaN, 3, '+') => Error", () => {
            expect( () => {
                getResult(NaN, 3, "+")
            }).toThrow("The first argument must not be one of the following types: NaN, Infinity, -Infinity!");
        });

        test("73: (Infinity, 3, '+') => Error", () => {
            expect( () => {
                getResult(Infinity, 3, "+")
            }).toThrow("The first argument must not be one of the following types: NaN, Infinity, -Infinity!");
        });

        test("74: (-Infinity, 3, '+') => Error", () => {
            expect( () => {
                getResult(-Infinity, 3, "+")
            }).toThrow("The first argument must not be one of the following types: NaN, Infinity, -Infinity!");
        });
    });

    describe("Negative test cases for the 2 argument", () => {

        test("75: (3, undefined, '+') => Error", () => {
            expect( () => {
                getResult(3, undefined, "+")
            }).toThrow("The second argument must be a number!");
        });

        test("76: (3, null, '+') => Error", () => {
            expect( () => {
                getResult(3, null, "+")
            }).toThrow("The second argument must be a number!");
        });

        test("77: (3, '3', '+') => Error", () => {
            expect( () => {
                getResult(3, "3", "+")
            }).toThrow("The second argument must be a number!");
        });

        test("78: (3, 3n, '+') => Error", () => {
            expect( () => {
                getResult(3, 3n, "+")
            }).toThrow("The second and the second argument must be the same type: Number or BigInt!");
        });

        test("79: (3, true, '+') => Error", () => {
            expect( () => {
                getResult(3, true, "+")
            }).toThrow("The second argument must be a number!");
        });

        test("80: (3, Symbol(), '+') => Error", () => {
            expect( () => {
                getResult(3, Symbol(), "+")
            }).toThrow("The second argument must be a number!");
        });

        test("81: ({}, 3, '+') => Error", () => {
            expect( () => {
                getResult(3, {}, "+")
            }).toThrow("The second argument must be a number!");
        });

        test("82: (3, NaN, '+') => Error", () => {
            expect( () => {
                getResult(3, NaN, "+")
            }).toThrow("The second argument must not be one of the following types: NaN, Infinity, -Infinity!");
        });

        test("83: (3, Infinity, '+') => Error", () => {
            expect( () => {
                getResult(3, Infinity, "+")
            }).toThrow("The second argument must not be one of the following types: NaN, Infinity, -Infinity!");
        });

        test("84: (3, -Infinity, '+') => Error", () => {
            expect( () => {
                getResult(3, -Infinity, "+")
            }).toThrow("The second argument must not be one of the following types: NaN, Infinity, -Infinity!");
        });
    });

    describe("Negative tet cases for the third argument", () => {

        test("85: (3, 3, '$') => Error", () => {
            expect( () => {
                getResult(3, 3, "$")
            }).toThrow("The operator argument must be one of the following types: + | - | * | / | ** | % !");
        });

        test("86: (3, 3, '') => Error", () => {
            expect( () => {
                getResult(3, 3, "")
            }).toThrow("The operator argument must be one of the following types: + | - | * | / | ** | % !");
        });

        test("87: (3, 3) => Error", () => {
            expect( () => {
                getResult(3, 3)
            }).toThrow("The operator argument must be one of the following types: + | - | * | / | ** | % !");
        });
    });
});

describe("isCharPresent test suite", () => {

    describe("Positive test cases", () => {

        test("88: ('hello', 'l') => true", () => {
            expect(isCharPresent("hello", "l")).toBe(true);
        });

        test("89: ('hello', 'd') => false", () => {
            expect(isCharPresent("hello", "d")).toBe(false);
        });

        test("90: ('', 'd') => false", () => {
            expect(isCharPresent("", "d")).toBe(false);
        });
    });

    describe("Negative test cases for the 1 argument", () => {

        test("91: (4, '^') => Error", () => {
            expect( () => {
                isCharPresent(4, "^");
            }).toThrow("The first arguments must be a string!"); 
        });

        test("92: (undefined, '^') => Error", () => {
            expect( () => {
                isCharPresent(undefined, "^");
            }).toThrow("The first arguments must be a string!"); 
        });

        test("93: (null, '^') => Error", () => {
            expect( () => {
                isCharPresent(null, "^");
            }).toThrow("The first arguments must be a string!"); 
        });

        test("94: (10n, '^') => Error", () => {
            expect( () => {
                isCharPresent(10n, "^");
            }).toThrow("The first arguments must be a string!"); 
        });

        test("95: (Symbol(), '^') => Error", () => {
            expect( () => {
                isCharPresent(Symbol(), "^");
            }).toThrow("The first arguments must be a string!"); 
        });

        test("96: ({}, '^') => Error", () => {
            expect( () => {
                isCharPresent({}, "^");
            }).toThrow("The first arguments must be a string!"); 
        });

        test("97: (true, '^') => Error", () => {
            expect( () => {
                isCharPresent(true, "^");
            }).toThrow("The first arguments must be a string!"); 
        });
    });

    describe("Negative test cases for the 2 argument", () => {

        test("98: ('hello', undefined) => Error", () => {
            expect( () => {
                isCharPresent("hello", undefined);
            }).toThrow("The second arguments must be a string!"); 
        });

        test("99: ('hello', null) => Error", () => {
            expect( () => {
                isCharPresent("hello", null);
            }).toThrow("The second arguments must be a string!"); 
        });

        test("100: ('hello', 1) => Error", () => {
            expect( () => {
                isCharPresent("hello", 1);
            }).toThrow("The second arguments must be a string!"); 
        });

        test("101: ('hello', 10n) => Error", () => {
            expect( () => {
                isCharPresent("hello", 10n);
            }).toThrow("The second arguments must be a string!"); 
        });

        test("102: ('hello', true) => Error", () => {
            expect( () => {
                isCharPresent("hello", true);
            }).toThrow("The second arguments must be a string!"); 
        });

        test("103: ('hello', Symbol()) => Error", () => {
            expect( () => {
                isCharPresent("hello", Symbol());
            }).toThrow("The second arguments must be a string!"); 
        });

        test("104: ('hello', {}) => Error", () => {
            expect( () => {
                isCharPresent("hello", {});
            }).toThrow("The second arguments must be a string!"); 
        });

        test("105: ('hello', '##') => Error", () => {
            expect( () => {
                isCharPresent("hello", "##");
            }).toThrow("The second arguments must be one character long!"); 
        });

        test("106: ('', '') => Error", () => {
            expect( () => {
                isCharPresent("", "")
            }).toThrow("The second arguments must be one character long!");
        });
    });
});

describe("charIndexOf test suite", () => {

    describe("Positive test cases", () => {

        test("107: ('hello', 'l') => 2", () => {
            expect(charIndexOf("hello", "l")).toBe(2);
        });

        test("108: ('hello', 'd') => -1", () => {
            expect(charIndexOf("hello", "d")).toBe(-1);
        });

        test("109: ('', 'l') => -1", () => {
            expect(charIndexOf("", 'l')).toBe(-1);
        });
    });

    describe("Negative test cases for the 1 argument", () => {

        test("110: (undefined, 'l') => Error", () => {
            expect( () => {
                charIndexOf(undefined, "l");
            }).toThrow("The first argument must be a string!");
        });

        test("111: (null, 'l') => Error", () => {
            expect( () => {
                charIndexOf(null, "l");
            }).toThrow("The first argument must be a string!");
        });

        test("112: (0, 'l') => Error", () => {
            expect( () => {
                charIndexOf(0, "l");
            }).toThrow("The first argument must be a string!");
        });

        test("113: (10n, 'l') => Error", () => {
            expect( () => {
                charIndexOf(10n, "l");
            }).toThrow("The first argument must be a string!");
        });

        test("114: (Symbol(), 'l') => Error", () => {
            expect( () => {
                charIndexOf(Symbol(), "l");
            }).toThrow("The first argument must be a string!");
        });

        test("115: ({}, 'l') => Error", () => {
            expect( () => {
                charIndexOf({}, "l");
            }).toThrow("The first argument must be a string!");
        });

        test("116: (false, 'l') => Error", () => {
            expect( () => {
                charIndexOf(false, "l");
            }).toThrow("The first argument must be a string!");
        });
    });

    describe("Negative test cases for the second argument", () => {

        test("117: ('hello', 'll') => Error", () => {
            expect( () => {
                charIndexOf("hello", "ll");
            }).toThrow("The second argument must be one character long!");
        });

        test("118: ('hello', '') => Error", () => {
            expect( () => {
                charIndexOf("hello", "");
            }).toThrow("The second argument must be one character long!");
        });

        test("119: ('hello', undefined) => Error", () => {
            expect( () => {
                charIndexOf("hello", undefined);
            }).toThrow("The second argument must be a string!");
        });

        test("120: ('hello', null) => Error", () => {
            expect( () => {
                charIndexOf("hello", null);
            }).toThrow("The second argument must be a string!");
        });

        test("121: ('hello', 1) => Error", () => {
            expect( () => {
                charIndexOf("hello", 1);
            }).toThrow("The second argument must be a string!");
        });

        test("122: ('hello', 10n) => Error", () => {
            expect( () => {
                charIndexOf("hello", 10n);
            }).toThrow("The second argument must be a string!");
        });

        test("123: ('hello', true) => Error", () => {
            expect( () => {
                charIndexOf("hello", true);
            }).toThrow("The second argument must be a string!");
        });

        test("124: ('hello', Symbol()) => Error", () => {
            expect( () => {
                charIndexOf("hello", Symbol());
            }).toThrow("The second argument must be a string!");
        });

        test("125: ('hello', {}) => Error", () => {
            expect( () => {
                charIndexOf("hello", {});
            }).toThrow("The second argument must be a string!");
        });
    });
});
