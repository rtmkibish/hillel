const { ToDoList } = require("./index");

describe("The ToDoList function tests", () => {

  test("1: To be unextended", () => {
    const toDoList = new ToDoList();
    toDoList.newProp = 1;
    expect(toDoList).toEqual(new ToDoList());
  });

  test("2: To be immutable", () => {
    const toDoList = new ToDoList();
    toDoList.addTask = 1;
    expect(toDoList).toEqual(new ToDoList());
  });

  test("3: Can't delete a property", () => {
    const toDoList = new ToDoList();
    delete toDoList.deleteTask;
    expect(toDoList).toEqual(new ToDoList());
  });

  test("4: Can't rewrite the ToDoList()._tasks", () => {
    const toDoList = new ToDoList();
    toDoList._tasks = [{a: 1}];
    expect(toDoList).toEqual(new ToDoList());
  });

  test("5: Can't rewrite the ToDoList().tasks getter", () => {
    const toDoList = new ToDoList();
    toDoList.tasks = [{a: 1}];
    expect(toDoList).toEqual(new ToDoList());
  });

  test("6: Can't reconfigure a property", () => {
    const toDoList = new ToDoList();
    expect( () => {
      Object.defineProperty(toDoList, "_tasks", {writable: true})
    }).toThrow("Cannot redefine property: _tasks");
  });

  test("7: Add a task", () => {
    const toDoList = new ToDoList();
    toDoList.addTask({
      title: "Buy milk",
      text: "Buy milk to make a cake",
      isDone: false,
    }, true);
    expect(toDoList.tasks.length).toBe(1);
  });

  test("8: Can't add a duplicate task", () => {
    const toDoList = new ToDoList();
    toDoList.addTask({
      title: "Buy milk",
      text: "Buy milk to make a cake",
      isDone: false,
    }, true);
    toDoList.addTask({
      title: "Buy milk",
      text: "Buy milk to make a cake",
      isDone: false,
    }, true);    
    expect(toDoList.tasks.length).toBe(1);
  });

  test("9: Edit a task", () => {
    const toDoList = new ToDoList();
    toDoList.addTask({
      title: "Buy milk",
      text: "Buy milk to make a cake",
      isDone: false,
    }, true);
    const taskToEdit = toDoList.tasks[0];
    taskToEdit.title = "Buy water";
    taskToEdit.text = "Buy water because it is hot"
    toDoList.editTask(taskToEdit, true);
    expect(toDoList.tasks[0]).toEqual({
      title: "Buy water",
      text: "Buy water because it is hot",
      isDone: false,
      createdAt: taskToEdit.createdAt,
      id: taskToEdit.id
    });
  });

  test("10: Can't edit to duplicate the task", () => {
    const toDoList = new ToDoList();
    const buyMilk = {
      title: "Buy milk",
      text: "Buy milk to make a cake",
      isDone: false,
    };
    const buySalt = {
      title: "Buy salt",
      text: "Buy salt for a salad",
      isDone: false,};
    const buyMilkTask = toDoList.addTask(buyMilk, true);
    const buySaltTask = toDoList.addTask(buySalt, true);
    toDoList.editTask(buyMilkTask, buySalt, true);
    expect(toDoList.tasks[0]).toEqual({
      title: buyMilkTask.title,
      text: buyMilkTask.text,
      isDone: buyMilkTask.isDone,
      id: buyMilkTask.id,
      createdAt: buyMilkTask.createdAt,
    });
  });

  test("11: Delete a task", () => {
    const toDoList = new ToDoList();
    toDoList.addTask({
      title: "Buy milk",
      text: "Buy milk to make a cake",
      isDone: false,
    }, true);
    const firstTask = toDoList.tasks[0];
    const tasksNumberBeforeTest = toDoList.tasks.length;
    toDoList.deleteTask(firstTask.id, true);
    expect(toDoList.tasks.length).not.toBe(tasksNumberBeforeTest);
  });

  test("12: Get number of All tasks", () => {
    const toDoList = new ToDoList();
    toDoList.addTask({
      title: "Buy milk",
      text: "Buy milk to make a cake",
      isDone: false,
    }, true);
    expect(toDoList.getNumberOfAllTasks()).toBe(1);
  });

  test("13: Get number of Done tasks", () => {
    const toDoList = new ToDoList();
    toDoList.addTask({
      title: "Buy milk",
      text: "Buy milk to make a cake",
      isDone: true,
    }, true);
    expect(toDoList.getNumberOfDoneTasks()).toBe(1);
  });

  test("14: Get number of Not Done tasks", () => {
    const toDoList = new ToDoList();
    toDoList.addTask({
      title: "Buy milk",
      text: "Buy milk to make a cake",
      isDone: false,
    }, true);
    expect(toDoList.getNumberOfNotDoneTasks()).toBe(1);
  });
});
