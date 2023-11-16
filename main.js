"use strict";

class Todo {
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
      this.add({
        title: this.prompt("title"),
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
      this.rename(this.#getElementIndex(element.parentNode), this.prompt("title"));
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
  #createOverlay(id) {
    const element = document.createElement("div");
    element.id = id;
    Object.assign(element.style, {
      background: "#f4343490",
      position: "absolute",
      top: "0", left: "0",
      width: "100%",
      height: "100%",
      zIndex: "2147483647",
      display: "none"
    });
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
    
    this.element.overlay  = this.element.root.appendChild(this.#createOverlay("todo-overlay"));
    
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
    this.save();
    this.display();
  }
  rename(index, title="") {
    this.list[index].title = title;
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
  prompt(text="") {
    // todo //
    return prompt(text);
  }
  showOverlay() {
    this.element.overlay.style.display = "block";
  }
  hideOverlay() {
    this.element.overlay.style.display = "none";
  }
  display() {
    this.element.todoList.innerHTML = "";
    for (let data of this.list) {
      this.element.todoList.appendChild(this.#createTodo(data));
    }
  }
  save(key="todo") {
    localStorage.setItem(key, JSON.stringify(this.list));
  }
  load(key="todo") {
    const list = localStorage.getItem(key);
    if (list) {
      this.list = JSON.parse(list);
      this.display();
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

TODO.load();
