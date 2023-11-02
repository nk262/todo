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

addTodo({
  display: true,
  title: "a",
  text: "A\n\tB\n\t\tC\n\tD"
});
addTodo({
  display: true,
  title: "b",
  text: "A\n\tB\n\t\tC\n\t\t\tD"
});
addTodo({
  display: true,
  title: "c",
  text: "A\n\tB\n\t\tC\n\t\tD"
});
