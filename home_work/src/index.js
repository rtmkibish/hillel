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
    value: function(data, confirmed) {
      if (confirmed && !this._isDuplicate(data)) {
          data.id = Date.now() + (Math.floor(Math.random() * 1000));
          data.createdAt = new Date().toISOString();
          const newTaskIndex = this._tasks.push(data) - 1;
          return this._tasks[newTaskIndex];
        }
      }
  },
  deleteTask: {
    value: function(id, confirmed) {
      if (confirmed) {
        const taskToDeleteIndex = this._tasks.findIndex(item => item.id === id);
        if (taskToDeleteIndex >= 0) {
          return this._tasks.splice(taskToDeleteIndex, 1);
        }
      }
    }
  },
  editTask: {
    value: function(task, data, confirmed) {
      if (confirmed && !this._isDuplicate(data)) {
        const taskToChange = this._tasks.find(t => t.id === task.id);
        return Object.assign(taskToChange, data);
      }
    }
  },
  getNumberOfDoneTasks: {
    value: function() {
      const doneTasks = this._tasks.filter(task => task.isDone === true);
      return doneTasks.length;
    },
  },
  getNumberOfNotDoneTasks: {
    value: function() {
      const notDoneTasks = this._tasks.filter(task => task.isDone === false);
      return notDoneTasks.length;
    },
  },
  getNumberOfAllTasks: {
    value: function() {
      return this._tasks.length;
    }
  },
  _isDuplicate: {
    value: function(task) {
      const isDuplicate = this._tasks.find(t => {
      return t.title === task.title && t.text === task.text && t.isDone === task.isDone;
      });
      return isDuplicate;
    },
  },
});

Object.preventExtensions(this);

}

module.exports = { ToDoList };