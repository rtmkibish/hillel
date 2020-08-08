function ToDoList() {

  Object.defineProperty(this, "_tasks", {
    value: [],
    writable: true,
  });
  Object.preventExtensions(this);
}

// Internal help method
Object.defineProperties(ToDoList, {
  _isDuplicate: {
    value: function (tasksList, task) {
      const isDuplicate = tasksList.find(t => {
        return t.title === task.title && t.text === task.text && t.isDone === task.isDone;
      });
      return isDuplicate;
    },
  },
  _getTask: {
    value: function ({
      id
    }, tasksList) {
      const newTaskIndex = tasksList.findIndex(t => t.id === id);
      return tasksList[newTaskIndex];
    }
  },
});

// Prototype for ToDoList
Object.defineProperties(ToDoList.prototype, {
  addTask: {
    value: function (data, confirmed) {
      if (confirmed && !ToDoList._isDuplicate(data, this._tasks)) {
        data.id = Date.now() + (Math.floor(Math.random() * 1000));
        data.createdAt = new Date().toISOString();
        this._tasks = [data, ...this._tasks];
        return ToDoList._getTask(data);
      }
    }
  },
  deleteTask: {
    value: function (task, confirmed) {
      if (confirmed) {
        const deletedTask = ToDoList._getTask(task, this._tasks);
        this._tasks = this._tasks.filter(t => t.id !== task.id);
        return deletedTask;
      }
    }
  },
  editTask: {
    value: function (task, data, confirmed) {
      if (confirmed && !ToDoList._isDuplicate(data, this._tasks)) {
        this._tasks = this._tasks.map(t => {
          if (t.id === task.id) {
            return {
              ...t,
              ...data
            }
          } else {
            return t;
          }
        });
      }
      return ToDoList._getTask(task, this._tasks);
    }
  },
  statistic: {
    get: function () {
      const statObj = this._tasks.reduce((prev, t) => ({
        ...prev,
        done: t.isDone ? ++prev.done : prev.done,
      }), {
        total: this._tasks.length,
        done: 0
      });
      return statObj;
    }
  }
});

module.exports = {
  ToDoList
};