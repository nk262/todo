"use strict";

class Todo {
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
      this.add({
        title: "Test" + this.list.length,
        value: "text!" + this.list.length
      });
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
  #createTodoButtonArea() {
    const element = document.createElement("span");
    Object.assign(element.style, {
      background: "#205050",
      overflowX: "scroll",
      width: "30%",
      padding: "5px",
      whiteSpace: "nowrap"
    });
    element.appendChild(this.#createButton("Rename", e => {
      this.rename(this.#getElementIndex(element.parentNode), prompt("title"));
    }));
    element.appendChild(this.#createButton("Remove", e => {
      this.remove(this.#getElementIndex(element.parentNode));
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
    if (data.selected) { element.style.background = "#305030" }
    element.appendChild(this.#createTodoTitle(data.title));
    element.appendChild(this.#createTodoButtonArea());
    return element;
  }
  constructor(targetElement) {
    this.element = { root : targetElement };
    Object.assign(this.element.root.style, {
      display: "flex",
      flexDirection: "column"
    });
    this.element.topBar   = this.element.root.appendChild(this.#createTopBar("todo-top-bar"));
    this.element.todoList = this.element.root.appendChild(this.#createTodoList("todo-list"));
    
    this.list = [];
  }
  #getElementIndex(element) {
    return [...element.parentNode.children].indexOf(element);
  }
  add(data) {
    this.list.push({
      title: data.title,
      value: data.value,
      selected: false
    });
    this.display();
  }
  rename(index, title="") {
    this.list[index].title = title;
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
    this.display();
  }
  clear() {
    this.list = [];
    this.display();
  }
  select(...indexes) {
    for (let index of indexes) {
      this.list[index].selected = true;
    }
    this.display();
  }
  deselect(...indexes) {
    for (let index of indexes) {
      this.list[index].selected = false;
    }
    this.display();
  }
  toggleSelect(...indexes) {
    for (let index of indexes) {
      this.list[index].selected = !this.list[index].selected;
    }
    this.display();
  }
  display() {
    this.element.todoList.innerHTML = "";
    for (let data of this.list) {
      this.element.todoList.appendChild(this.#createTodo(data));
    }
  }
}



let a = document.createElement("div");
Object.assign(a.style, {
  background: "#444444",
  width: "auto",
  height: "70vh",
  border: "solid 4px #366696",
  borderRadius: "10px"
});
document.body.appendChild(a);

const TODO = new Todo(a);

for (let i = 0; i < 10; i++) {
  TODO.add({
    title: "Title [" + i + "]",
    value: "Text [" + i + "]"
  });
}
