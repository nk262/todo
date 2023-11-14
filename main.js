"use strict";

class Todo {
  constructor() {
    this.list = [];
  }
  #createTodoEditor(id) {
    const editorContainer = document.createElement("div");
    editorContainer.id = id;
    Object.assign(editorContainer.style, {
      background: "#343434",
      margin: "0",
      padding: "0",
      zIndex: "101",
      position: "relative",
      left: "50%", top: "50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      height: "80%"
    });
    return editorContainer;
  }
  #createTodoOverlay(id) {
    const todoOverlay = document.createElement("div");
    todoOverlay.id = id;
    Object.assign(todoOverlay.style, {
      background: "#34343490",
      display: "none",
      margin: "0",
      padding: "0",
      zIndex: "100",
      position: "fixed",
      left: "0", top: "0",
      width: "100%",
      height: "100%"
    });
    return todoOverlay;
  }
  #createTodoList(id) {
    const todoList = document.createElement("div");
    todoList.id = id;
    return todoList;
  }
  #createTodo(data) {
    const todo = document.createElement("div");
    todo.innerText = data.title;
    return todo;
  }
  init(targetElement) {
    this.todoList = this.#createTodoList("todo-list");
    
    this.todoOverlay = this.#createTodoOverlay("todo-overlay");
    this.todoEditor = this.#createTodoEditor("todo-editor");
    this.todoOverlay.appendChild(this.todoEditor);
    
    targetElement.appendChild(this.todoList);
    targetElement.appendChild(this.todoOverlay);
  }
  add(data) { this.list.push(data) }
  clear() { this.list = [] }
  display() {
    if (!this.todoList) return;
    this.todoList.innerHTML = "";
    for (let data of this.list) {
      const todo = this.#createTodo(data);
      this.todoList.appendChild(todo);
    }
  }
  showOverlay() {
    if (!this.todoOverlay) return;
    this.todoOverlay.style.display = "block";
  }
  hideOverlay() {
    if (!this.todoOverlay) return;
    this.todoOverlay.style.display = "none";
  }
}


const TODO = new Todo();

TODO.init(document.body);


// test add //
TODO.add({
  title: "This is test title [1]",
  text: "This is test text [1]"
});
TODO.add({
  title: "This is test title [2]",
  text: "This is test text [2]"
});
TODO.add({
  title: "This is test title [3]",
  text: "This is test text [3]"
});


TODO.display();

window.addEventListener("load", () => {
  monaco.editor.create(TODO.todoEditor, {
    value: "Test",
    language: "markdown",
    theme: "vs-dark",
  });
});
