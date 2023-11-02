'use strict';

function todoElement({title, text, display}) {
  
  const todo = document.createElement("div");
  todo.classList.add("todo");
  
  const todoTitle = document.createElement("p");
  const todoText = document.createElement("pre");
  
  todoTitle.classList.add("todotitle");
  todoText.classList.add("todotext");
  
  todoTitle.innerText = title;
  todoText.innerText = text;
  
  todo.appendChild(todoTitle);
  todo.appendChild(todoText);
  

  const defaultTodoTextDisplay = todoText.style.display;
  if (!display) {
    todoText.style.display = "none";
  }
  todo.addEventListener("click", function() {
    if (todoText.style.display === defaultTodoTextDisplay) {
      todoText.style.display = "none";
    } else {
      todoText.style.display = defaultTodoTextDisplay;
    }
  });

  return todo;
}

const todolist = document.getElementById("todolist");

todolist.appendChild(todoElement({
  title: "title1",
  text: "Hello\nHello",
  display: true
}));
todolist.appendChild(todoElement({
  title: "title2",
  text: "Hello",
  display: true
}));
todolist.appendChild(todoElement({
  title: "title3",
  text: "Hello",
  display: false
}));
