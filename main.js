'use strict';

function todoElement({title, text}) {
  
  const todo = document.createElement("div");
  todo.classList.add("todo");
  
  const todoTitle = document.createElement("p");
  const todoText = document.createElement("pre");
  
  todoTitle.classList.add("todotitle");
  todoText.classList.add("todotext");
  
  todoTitle.innerText = title;
  todoText.innerText = text
  
  todo.appendChild(todoTitle);
  todo.appendChild(todoText);
  
  return todo;
}

const todolist = document.getElementById("todolist");

todolist.appendChild(todoElement({
  title: "title1",
  text: "Hello\nHello"
}));
todolist.appendChild(todoElement({
  title: "title2",
  text: "Hello"
}));
todolist.appendChild(todoElement({
  title: "title3",
  text: "Hello"
}));
