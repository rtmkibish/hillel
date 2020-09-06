'use strict';

class TodoList {
  #token;
  #notes;
  #baseEndpoint = 'https://todo.hillel.it/todo';
  #authEndpoint = 'https://todo.hillel.it/auth/login';
  #listSelector = '#todo-list';
  #filter = 'all';

  constructor(username) {
    this.#init(username);
  }

  async #init(username) {
    const authBlob = {
      value: username,
    };

    try {
      const res = await fetch(this.#authEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authBlob),
      });
      if (res.status !== 201) {
        throw new Error('Failed to get proper response')
      }
      const authDTO = await res.json(); 
      this.#token = authDTO.access_token;
      const rawNotes = await fetch(this.#baseEndpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.#token}`,
        }
      });
      if (!rawNotes.ok) {
        throw new Error('Failed to get proper response')
      } 
      this.#notes = await rawNotes.json();
      this.renderAllList();
    } catch (e) {
      console.log(e);
    }
  }

  async createNote(data) {
    const notePayload = {
      value: data,
      priority: 1,
    }
    const res = await fetch(this.#baseEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.#token}`
      },
      body: JSON.stringify(notePayload),
    });
  
    if (res.status !== 201) {
      throw new Error('Failed to get proper response')
    }
    const newNote = await res.json();
    this.#notes.unshift(newNote);
    if (this.#filter == "all") {
      todo.renderAllList();
    }
  }

  async deleteNote(id) {
    const res = await fetch(this.#baseEndpoint + "/" + id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.#token}`,
      },
    });
    if (res.ok) {
      this.#notes = this.#notes.filter(note => note._id != id);
      if (this.#filter == 'all') {
        this.renderAllList();
      } else {
        this.renderDoneOnlyList();
      }
    }
  }

  async toggleNote($element) {
    const id = $element.dataset.id;
    const res = await fetch(`${this.#baseEndpoint}/${id}/toggle`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.#token}`,
      }
    });
    if (res.ok) {
      this.#notes = this.#notes.map(note => {
        if (note._id == id) {
          note.checked = !note.checked;
        }
        return note;
      });
      this.#renderNote($element);
    }
  }

  #renderNote(element) {
    const $span = element.querySelector('span');
    $span.classList.toggle('done-note');
    const $checkBox = element.querySelector('input');
    if (this.#filter == 'done' && !$checkBox.checked) {
      element.style.display = 'none';
    }
  }

  #getListOfLiComponents(array){
    const elements = array.map(note => {
      const $li = document.createElement('li');
      $li.innerHTML = `<div data-id="${note._id}">
        <input type="checkbox" ${note.checked ? 'checked': ''}>
        <span class="${note.checked ? 'done-note': ''}">${note.value}</span>
        <button type="button">Delete</botton>
      </div>`
      return $li;
    });
    return elements;
  }

  renderAllList() {
    const $list = document.querySelector(this.#listSelector);
    $list.innerHTML = "";
    const listItems = this.#getListOfLiComponents(this.#notes);
    $list.append(...listItems);
    this.#filter = 'all';
  }

  renderDoneOnlyList() {
    const $list = document.querySelector(this.#listSelector);
    $list.innerHTML = "";
    const notes = this.#notes.filter(note => note.checked);
    const listItems = this.#getListOfLiComponents(notes);
    $list.append(...listItems);
    this.#filter = 'done';
  }

  get notes() {
    return this.#notes.slice();
  }

}

const credentials = prompt("Input your login:");
const todo = new TodoList(credentials.trim());
const $addBtn = document.forms.createNoteForm.elements.add;
$addBtn.addEventListener('click', e => {
  e.preventDefault();
  const $inputField = e.target.parentNode.elements.note;
  const newNoteValue = $inputField.value;
  if (newNoteValue.trim().length > 5) {
    todo.createNote($inputField.value);
    $inputField.value = "";
  }
});

const $list = document.querySelector('#todo-list');
$list.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const id = e.target.parentElement.dataset.id;
    todo.deleteNote(id);
  }
})

$list.addEventListener('change', e => {
  if (e.target.tagName === 'INPUT') {
    const $parent = e.target.parentNode;
    todo.toggleNote($parent);
  }
})

const $filterOption = document.forms.createNoteForm.filterBy;
$filterOption.addEventListener('change', e => {
  if (e.target.value === "all") {
    todo.renderAllList();
  } else {
    todo.renderDoneOnlyList();
  }
})
