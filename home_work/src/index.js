class List {

  static isDuplicate(item, array) {
    const isDuplicate = array.find(t => {
      return t.title === item.title && t.text === item.text;
    });
    return isDuplicate;
  }

  static getItem({id}, array) {
    const itemIndex = array.findIndex(item => item.id === id);
    return array[itemIndex];
  }

  constructor(items) {
    this._items = Array.isArray(items) ? items : [];
  }

  add(item, confirm) {
    if (confirm && !List.isDuplicate(item, this._items)) {
      item.id = Date.now() + (Math.floor(Math.random() * 1000));
      item.createdAt = new Date().toISOString();
      this._items = [item, ...this._items];
      return List.getItem(item, this._items);
    }
  }

  remove({id}, confirm) {
    if (confirm) {
      const removedItem = List.getItem(item, this._items);
      this._items = this._items.filter(item => item.id !== id);
      return removedItem;
    }
  }

  get items() {
    return this._items.slice();
  }

  loadFromLS(key) {
    if (typeof key != 'string') {
      throw new TypeError('Key must be a string type');
    } 
    const stringifiedItems = localStorage.getItem(key);
    const items = JSON.parse(stringifiedItems);
    return this._items = items ? items : [];
  }

  saveToLS(key) {
    const stringifiedItems = JSON.stringify(this._items);
    localStorage.setItem(key, stringifiedItems);
    return key;
  }
}


class ToDoList extends List {
  constructor(...args) {
    super(...args);
  }

  edit({id}, newData, confirm) {
    if (confirm && !List.isDuplicate(newData, this._items)) {
      this._items = this._items.map(item => {
        if (item.id === id) {
          return {
            ...item,
            ...newData
          }
        } else {
          return item;
        }
      });
    }
    return List.getItem({id}, this._items);
  }

  done({id}, confirm) {
    if (confirm) {
      this._items = this._items.map(item => {
        if (item.id === id) {
          item.isDone = true;
        }
        return item;
      });
    }
    return List.getItem({id}, this._items);
  }

  get statistic() {
    const statObj = this._items.reduce((prev, item) => ({
      ...prev,
      done: item.isDone ? ++prev.done : prev.done,
    }), {
      total: this._items.length,
      done: 0
    });
    return statObj;
  }
}

class ContactList extends List {
  constructor(...args) {
    super(...args);
  }

  add(contact, confirm) {
    const newContact = super.add(contact, confirm);
    newContact.phone = contact.phone;
    return newContact;
  }

  search(query) {
    let item;

    ext: for (let i = 0; i < this._items.length; i++) {
      for (let key of Object.keys(query)) {
        if (query[key] !== this._items[i][key]) {
          continue ext;
        }
      }
      return item = Object.assign({}, this._items[i]);
    }
  }
}
