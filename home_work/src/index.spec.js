const {
  ToDoList
} = require("./index");

describe("ToDoList tests", () => {
  test("1: Failed to define new prop", () => {
    const toDo = new ToDoList;
    expect(() => {
      Object.defineProperty(toDo, "test", {
        value: test,
      })
    }).toThrow(Error);
  });

  test("2: Failed to extend", () => {
    const toDo = new ToDoList;
    toDo.test = "test";
    expect(toDo.test).toBe(undefined);
  });

  test("3: Failed to delete prop", () => {
    const toDo = new ToDoList;
    expect(delete toDo._tasks).toBe(false);
  });

  test("4: Failed to configure prop", () => {
    const toDo = new ToDoList;
    expect(() => {
      Object.defineProperty(toDo, "_tasks", {
        enumerable: true,
      });
    }).toThrow(Error);
  });
});