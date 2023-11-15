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
    todoOverlay.addEventListener("click", e => {
      this.editorSave(this.editIndex);
      this.closeEditor();
    });
    return todoOverlay;
  }
  #createTodoList(id) {
    const todoList = document.createElement("div");
    todoList.id = id;
    Object.assign(todoList.style, {
      marginTop: "10px"
    });
    return todoList;
  }
  #createTodo(data) {
    const todo = document.createElement("div");
    todo.innerText = data.title;
    todo.addEventListener("click", e => {
      this.editIndex = [...this.todoList.children].indexOf(e.target);
      this.openEditor(this.editIndex);
    });
    return todo;
  }
  #createTopBar(id) {
    const topBar = document.createElement("div");
    topBar.id = id;
    Object.assign(topBar.style, {
        position: "fixed",
        zIndex: "102",
        top: "0", left: "0",
        width: "100%",
        height: "10px",
        background: "#363636",
        boxSizing: "border-box"
    });
    return topBar;
  }
  #initTodoEditor(targetElement) {
    this.editIndex = 0;
    this.todoEditor = monaco.editor.create(targetElement, {
      value: "Hi!",
      language: "markdown",
      theme: "vs-dark",
    });
    this.todoEditor.getModel().onDidChangeContent(e => {
      this.editorSave(this.editIndex);
    });
  }
  init(targetElement) {
    this.todoList = this.#createTodoList("todo-list");
    
    this.topBar = this.#createTopBar("todo-top-bar");

    this.todoOverlay = this.#createTodoOverlay("todo-overlay");
    this.todoEditorContainer = this.#createTodoEditorContainer("todo-editor");
    this.todoOverlay.appendChild(this.todoEditorContainer);
    
    targetElement.appendChild(this.todoList);
    targetElement.appendChild(this.topBar);
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
  openEditor(index) {
    if (!this.todoEditor) return;
    this.showOverlay();
    this.todoEditor.setValue(this.list[index].text);
  }
  editorSave(index) {
    if (!this.todoEditor) return;
    this.list[index].text = this.todoEditor.getValue();
  }
  closeEditor() {
    if (!this.todoEditor) return;
    this.hideOverlay();
  }
}


const TODO = new Todo();

TODO.init(document.body);


// test add //
for (let i = 0; i < 100; i++) {
  TODO.add({
    title: "This is test title ["+i+"]",
    text: "This is test text ["+i+"]"
  });
}


TODO.display();

TODO.hideOverlay();
