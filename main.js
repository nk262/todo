"use strict";

class Todo {
  constructor() {
    this.list = [];
  }
  #createTodoEditorContainer(id) {
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
      margin: "0",
      padding: "0",
      zIndex: "100",
      position: "fixed",
      left: "0", top: "0",
      width: "100%",
      height: "100%"
    });
    todoOverlay.addEventListener("click", this.hideOverlay.bind(this));
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
  #initTodoEditor(targetElement) {
    this.editIndex = 0;
    this.todoEditor = monaco.editor.create(targetElement, {
      value: "Hi!",
      language: "markdown",
      theme: "vs-dark",
    });
    this.todoEditor.getModel().onDidChangeContent(e => {
      this.list[this.editIndex].text = this.todoEditor.getValue();
    });
  }
  init(targetElement) {
    this.todoList = this.#createTodoList("todo-list");
    
    this.todoOverlay = this.#createTodoOverlay("todo-overlay");
    this.todoEditorContainer = this.#createTodoEditorContainer("todo-editor");
    this.todoOverlay.appendChild(this.todoEditorContainer);
    
    targetElement.appendChild(this.todoList);
    targetElement.appendChild(this.todoOverlay);

    this.#initTodoEditor(this.todoEditorContainer);
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
  closeOverlay() {
    if (!this.todoOverlay) return;
    this.hideOverlay();
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

TODO.hideOverlay();
