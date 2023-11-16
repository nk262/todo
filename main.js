"use strict";
/*
class Todo {
  constructor() {
    this.list = [];
    this.selectMode = false;
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
      marginTop: "30px"
    });
    return todoList;
  }
  #createTodo(data) {
    const todo = document.createElement("div");
    todo.innerText = data.title;
    todo.addEventListener("click", e => {
      this.editIndex = [...this.todoList.children].indexOf(e.target);
      if (this.selectMode) {
        this.list[this.editIndex].selected = !this.list[this.editIndex].selected;
        this.display();
        return;
      }
      this.allDeselect();
      this.list[this.editIndex].selected = true;
      this.display();
      this.openEditor(this.editIndex);
    });
    return todo;
  }
  #createTopBarButton(text, handler) {
    const topBarButton = document.createElement("button");
    topBarButton.innerText = text;
    Object.assign(topBarButton.style, {
        background: "#909090",
        color: "#0000ff",
        border: "none",
        margin: "2px",
        height: "calc(100% - 4px)"
    });
    topBarButton.addEventListener("click", handler.bind(this));
    return topBarButton;
  }
  #createTopBar(id) {
    const topBar = document.createElement("div");
    topBar.id = id;
    Object.assign(topBar.style, {
        position: "fixed",
        zIndex: "99",
        top: "0", left: "0",
        width: "100%",
        height: "30px",
        background: "#363636",
        boxSizing: "border-box"
    });
    const addButton = this.#createTopBarButton("Add", e => {
      this.add({
        title: "Add test ["+this.list.length+"]",
        text: "Add test ["+this.list.length+"]",
        selected: false
      });
      this.display();
    });
    const removeButton = this.#createTopBarButton("Remove", e => {
      this.removeSelect();
      this.display();
    });
    const clearButton = this.#createTopBarButton("Clear", e => {
      this.list = [];
      this.display();
    });
    const selectButton = this.#createTopBarButton("Select", e => {
      this.selectMode = !this.selectMode;
      if (this.selectMode) {
        selectButton.innerText = "[Select]";
      } else {
        selectButton.innerText = "Select";
      }
    });
    topBar.appendChild(addButton);
    topBar.appendChild(removeButton);
    topBar.appendChild(clearButton);
    topBar.appendChild(selectButton);
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
    this.hideOverlay();
  }
  add(data) { this.list.push(data) }
  removeSelect() {
    const newList = [];
    for (let data of this.list) {
      if (!data.selected) {
        newList.push(data)
      }
    }
    this.list = newList;
  }
  clear() { this.list = [] }
  allSelect() {
    for (let data of this.list) {
      data.selected = true;
    }
  }
  allDeselect() {
    for (let data of this.list) {
      data.selected = false;
    }
  }
  save() {
    localStorage.setItem("todo", JSON.stringify(this.list));
  }
  display() {
    if (!this.todoList) return;
    this.todoList.innerHTML = "";
    for (let data of this.list) {
      const todo = this.#createTodo(data);
      if (data.selected) {
        todo.style.color = "pink";
      }
      this.todoList.appendChild(todo);
    }
    this.save();
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
    this.save();
  }
  closeEditor() {
    if (!this.todoEditor) return;
    this.hideOverlay();
  }
}


const TODO = new Todo();

TODO.init(document.body);

let TODO_LIST = localStorage.getItem("todo");
if (TODO_LIST) {
  TODO.list = JSON.parse(TODO_LIST);
}

TODO.display();
*/

class Todo {
  #createTopBar(id) {
    const element = document.createElement("div");
    element.id = id;
    Object.assign(element.style, {
      background: "#503030",
      width: "100%"
    });
    return element;
  }
  #createTodoList(id) {
    const element = document.createElement("div");
    element.id = id;
    Object.assign(element.style, {
      overflow: "scroll",
      background: "#203020",
      width: "100%",
      maxHeight: "100%"
    });
    return element;
  }
  #createTodo(data) {
    const element = document.createElement("div");
    Object.assign(element.style, {
      background: "#306060",
      margin: "8px",
      padding: "5px",
      borderRadius: "5px",
      overflowX: "scroll",
      whiteSpace: "nowrap"
    });
    element.innerText = data.title;
    if (data.selected) { element.style.background = "#305030" }
    return element;
  }
  constructor(targetElement) {
    this.element = { root : targetElement };
    this.element.topBar   = this.element.root.appendChild(this.#createTopBar("todo-top-bar"));
    this.element.todoList = this.element.root.appendChild(this.#createTodoList("todo-list"));
    
    this.list = [];
  }
  add(data) {
    this.list.push({
      title: data.title,
      value: data.value,
      selected: false
    });
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
  width: "400px",
  height: "300px",
  margin: "10px",
  border: "solid 4px #366696",
  borderRadius: "4px"
});
document.body.appendChild(a);

const TODO = new Todo(a);

for (let i = 0; i < 10; i++) {
  TODO.add({
    title: "Title [" + i + "] ========================================",
    value: "Text [" + i + "]"
  });
}
