'use strict';

function addTodo({display, title, text}) {
  const todoList = document.getElementById("todolist");

  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("p");
  todoTitle.classList.add("todotitle");
  todoTitle.innerText = title;
  todo.appendChild(todoTitle);

  const todoText = document.createElement("pre");
  todoText.classList.add("todotext");
  todoText.innerText = text;
  todo.appendChild(todoText);


  const defaultTextDisplay = todoText.style.display;
  if (!display) { todoText.style.display = "none" }

  todo.addEventListener("click", function() {
    if (todoText.style.display === "none") {
      todoText.style.display = defaultTextDisplay;
    } else {
      todoText.style.display = "none";
    }
  });

  todoList.appendChild(todo);
}

for (let i = 0; i < 30; i++) {
  addTodo({
    display: false,
    title: "[Title]",
    text: " ~~~ Text ~~~\n\n\n\t\t "
  });
}
