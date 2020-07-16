function ToDoList() {

Object.defineProperties(this, {
  _tasks: {
    value: [],
  },
  tasks: {
    get() {
      return this._tasks.slice();
    }
  },
  addTask: {
    value: function(task, confirmed) {
      if (confirmed) {
        const isDuplicate = this._tasks.find(t => {
          return t.title === task.title && t.text === task.text && t.isDone === task.isDone;
        });
        console.log(isDuplicate);
        if (!isDuplicate) {
          task.id = Date.now() + (Math.floor(Math.random() * 1000));
          task.created = new Date().toISOString();
          return this._tasks.push(task);
        }
      }
    }
  },
  deleteTask: {
    value: function(id, confirmed) {
      if (confirmed) {
        const taskToDeleteIndex = this._tasks.findIndex(item => item.id === id);
        if (taskToDeleteIndex >= 0) {
          this._tasks.splice(taskToDeleteIndex, 1);
        }
      }
    }
  },
  editTask: {
    value: function(task, confirmed) {
      if (confirmed) {
        const taskToChange = this._tasks.find(t => t.id === task.id);
        Object.assign(taskToChange, task);
      }
    }
  },
  getDone: {
    value: function() {
      const doneTasks = this._tasks.filter(task => task.isDone === true);
      return doneTasks;
    },
  },
  getNotDone: {
    value: function() {
      const notDoneTasks = this._tasks.filter(task => task.isDone === false);
      return notDoneTasks;
    },
  },
});

Object.preventExtensions(this);

}

const toDoList = new ToDoList();