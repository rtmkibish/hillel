const { odd, even, flat } = require("./index");

describe("The odd function test suite", () => {

    test("1: ([1, 2, 3, 4]) => [1, 3]", () => {
        const array = [1, 2, 3, 4];
        expect(odd(array)).toEqual([1, 3]);
    });

    test("2: ([2, 4, 6, 8]) => []", () => {
        const array = [2, 4, 6, 8];
        expect(odd(array)).toEqual([]);
    });

    test("3: ([1, 3, '3', 'sdf', true, [], {}]) => []", () => {
        const array = [1, 3, '3', 'sdf', true, [], {}];
        expect(odd(array)).toEqual([1, 3]);
    });
});

describe("The even function test suite", () => {

    test("4: ([1, 2, 3, 4]) => [1, 3]", () => {
        const array = [1, 2, 3, 4];
        expect(even(array)).toEqual([2, 4]);
    });

    test("5: ([1, 3, 5, 7]) => []", () => {
        const array = [1, 3, 5, 7];
        expect(even(array)).toEqual([]);
    });

    test("6: ([]) => []", () => {
        const array = [];
        expect(even(array)).toEqual([]);
    });

    test("7: ([1, 3, 2, 4, '3', 'sdf', true, [], {}]) => [2, 4]", () => {
        const array = [1, 3, 2, 4, '3', 'sdf', true, [], {}];
        expect(even(array)).toEqual([2, 4]);
    });
});

describe("The flat function test suite", () => {

    test("8: ([[1, 2, '56'],3, 4, [false, null, 4, Symbol()], true]) => [1, 2, 3, 4, 4]", () => {
        const array = [[1, 2, "56"],3, 4, [false, null, 4, Symbol()], true];
        expect(flat(array)).toEqual([1, 2, 3, 4, 4]);
    });

    test("9: ([]) => []", () => {
        const array = [];
        expect(flat(array)).toEqual([]);
    });

    test("10: ([[], [], []]) => []", () => {
        const array = [];
        expect(flat(array)).toEqual([]);
    });
});