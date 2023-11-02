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
  display: false,
  title: "a",
  text: "A\n\tB\n\t\tC\n\tD"
});
addTodo({
  display: false,
  title: "b",
  text: "A\n\tB\n\t\tC\n\t\t\tD"
});
addTodo({
  display: false,
  title: "c",
  text: "A\n\tB\n\t\tC\n\t\tD"
});

for (let i = 0; i < 20; i++) {
  addTodo({
    display: false,
    title: "X",
    text: "A\nB\n\t\tC\n\t\tD"
  });
}
