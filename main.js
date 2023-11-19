"use strict";

class Todo {
  constructor(data, param={}) {
    this.data = data;
    this.edit = false;
    Object.assign(this, param);
  }
  get title() {
    return this.data.title;
  }
  set title(text) {
    this.data.title = text;
  }
}

class TodoList {
  #createTodoMain(id) {
    const element = document.createElement("div");
    element.id = id;
    Object.assign(element.style, {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%"
    });
    return element;
  }
  #createButton(text, handler, style={}) {
    const element = document.createElement("button");
    Object.assign(element.style, {
      background: "#404040",
      color: "#eeeeee",
      border: "none",
      borderRadius: "5px",
      userSelect: "none"
    });
    Object.assign(element.style, style);
    element.innerText = text;
    element.addEventListener("click", handler.bind(this));
    return element;
  }
  #createTopBar(id) {
    const element = document.createElement("div");
    element.id = id;
    Object.assign(element.style, {
      background: "#503030",
      width: "100%"
    });
    element.appendChild(this.#createButton("Add", e => {
      const todo = this.add({
        title: "",
      }, {
        edit: true
      });
      todo.element.editInput.focus();
    }, {
      margin: "5px",
      marginLeft: "10px",
      padding: "8px"
    }));
    element.appendChild(this.#createButton("Clear", e => {
      this.clear();
    }, {
      margin: "5px",
      padding: "8px"
    }));
    return element;
  }
  #createTodoList(id) {
    const element = document.createElement("div");
    element.id = id;
    Object.assign(element.style, {
      overflow: "scroll",
      background: "#203020",
      width: "100%"
    });
    return element;
  }
  #createTodoTitle(text) {
    const element = document.createElement("span");
    Object.assign(element.style, {
      background: "#205020",
      overflowX: "scroll",
      width: "100%",
      padding: "5px",
      whiteSpace: "nowrap"
    });
    element.innerText = text;
    return element;
  }
  #createTodoEdit(title) {
    const element = document.createElement("input");
    Object.assign(element.style, {
      background: "#205020",
      color: "#efefef",
      overflowX: "scroll",
      width: "100%",
      padding: "5px",
      whiteSpace: "nowrap",
      border: "none",
      borderRadius: "0px",
      display: "none"
    });
    element.value = title;
    element.addEventListener("keydown", e => {
      if (e.key == "Enter") {
        const index = this.#getElementIndex(e.target.parentNode);
        this.edit(index, e.target.value);
      }
    });
    element.addEventListener("blur", e => {
      const index = this.#getElementIndex(e.target.parentNode);
      this.edit(index, e.target.value);
    });
    return element;
  }
  #createTodoButtonArea() {
    const element = document.createElement("span");
    Object.assign(element.style, {
      background: "#205050",
      overflowX: "scroll",
      width: "30%",
      padding: "5px",
      whiteSpace: "nowrap"
    });
    element.appendChild(this.#createButton("Edit", e => {
      const index = this.#getElementIndex(element.parentNode);
      const title = this.list[index].element.title;
      const input = this.list[index].element.editInput;
      input.style.display = "block";
      input.focus();
      input.select();
      title.style.display = "none";
    }, {
      margin: "2px",
      padding: "4px"
    }));
    element.appendChild(this.#createButton("Remove", e => {
      this.remove(this.#getElementIndex(element.parentNode));
    }, {
      margin: "2px",
      padding: "4px"
    }));
    return element;
  }
  #createTodo(data) {
    const element = document.createElement("div");
    Object.assign(element.style, {
      display: "flex",
      flexDirection: "row",
      background: "#306060",
      margin: "8px",
      borderRadius: "5px",
      overflowX: "scroll"
    });
    data.element = {
      title: element.appendChild(this.#createTodoTitle(data.title)),
      editInput: element.appendChild(this.#createTodoEdit(data.title)),
      buttonArea: element.appendChild(this.#createTodoButtonArea())
    };
    if (data.edit) {
      const title = data.element.title;
      const input = data.element.editInput;
      input.style.display = "block";
      input.focus();
      input.select();
      title.style.display = "none";
    }
    return element;
  }
  constructor(targetElement) {
    this.element = { root : targetElement };
    Object.assign(this.element.root.style, {
      position: "relative"
    });
    
    this.element.main = this.element.root.appendChild(this.#createTodoMain("todo-main"));
    this.element.topBar   = this.element.main.appendChild(this.#createTopBar("todo-top-bar"));
    this.element.todoList = this.element.main.appendChild(this.#createTodoList("todo-list"));
    
    this.list = [];
  }
  #getElementIndex(element) {
    return [...element.parentNode.children].indexOf(element);
  }
  add(data, param={}) {
    const todo = new Todo({
      title: data.title
    }, param);
    this.list.push(todo);
    this.save();
    this.display();
    return todo;
  }
  edit(index, title="") {
    this.list[index].title = title;
    this.list[index].edit = false;
    this.save();
    this.display();
  }
  remove(...indexes) {
    const newList = [];
    for (let index = 0; index < this.list.length; index++) {
      if (indexes.indexOf(index) === -1) {
        newList.push(this.list[index]);
      }
    }
    this.list = newList;
    this.save();
    this.display();
  }
  clear() {
    this.list = [];
    this.save();
    this.display();
  }
  display() {
    this.element.todoList.innerHTML = "";
    for (let data of this.list) {
      this.element.todoList.appendChild(this.#createTodo(data));
    }
  }
  save(key="todo") {
    const list = [];
    for (let todo of this.list) {
      list.push(todo.data);
    }
    localStorage.setItem(key, JSON.stringify(list));
  }
  load(key="todo") {
    let list = localStorage.getItem(key);
    if (list) {
      list = JSON.parse(list);
      for (let data of list) {
        this.list.push(new Todo({
          title: data.title
        }));
      }
      this.display();
    }
  }
}

let todolist = document.createElement("div");
Object.assign(todolist.style, {
  background: "#444444",
  width: "90vw",
  height: "90vh",
  border: "solid 4px #366696",
  borderRadius: "10px"
});
document.body.appendChild(todolist);

const TODO = new TodoList(todolist);
TODO.load();
