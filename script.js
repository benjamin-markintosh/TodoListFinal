// selectors
const todoInput = document.querySelector(".todoInput");
const todoButton = document.querySelector(".todoButton");
const todoList = document.querySelector(".todoList");
const filterOption = document.querySelector(".filterTodo");

//Event Listeners
document.addEventListener("DOMContentLoaded", showTodos);

todoButton.addEventListener("click", addTodo);

todoList.addEventListener("click", deleteCheck);

filterOption.addEventListener("click", filterTodo);

//Day function
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const d = new Date();

let month = months[d.getMonth()];
let day = days[d.getDay()];
document.getElementById("today").innerHTML =
  day + ", " + d.getDate() + " " + month + ", " + d.getFullYear();

// Functions

//Validate form Data

function validateFormData() {
  if (todoInput.value === "") {
    alert("Please Enter Task!");
    return false;
  } else {
    return true;
  }
}

function addTodo(e) {
  //prevent button default submitting
  e.preventDefault();

  if (validateFormData() === true) {
    //create div
    const todoDiv = document.createElement("div");
    //give div class
    todoDiv.classList.add("todo");

    //create list element
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todoItem");

    //add list element  to div
    todoDiv.appendChild(newTodo);
    //add todo to local storage

    saveLocalTodos(todoInput.value);
    //check button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class ="bx bx-list-check"></i>';
    completedButton.classList.add("completeBtn");

    //add check button to the div
    todoDiv.appendChild(completedButton);

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class ="bx bx-trash"></i>';
    deleteButton.classList.add("deleteBtn");

    //add check button to the div
    todoDiv.appendChild(deleteButton);

    // add created div to the ul in html

    todoList.appendChild(todoDiv);

    // clear type area
    todoInput.value = "";
  }
}

function deleteCheck(e) {
  const item = e.target;

  //delete the todo

  if (item.classList[0] === "deleteBtn") {
    const todo = item.parentElement;

    //animation
    todo.classList.add("swipe");
    deleteLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //check mark

  if (item.classList[0] === "completeBtn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.classList.remove("onlyComplete");
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.classList.add("onlyComplete");
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //check if todos exists
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function showTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    //create div
    const todoDiv = document.createElement("div");
    //give div class
    todoDiv.classList.add("todo");

    //create list elemenr
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todoItem");

    //add list element  to div
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    //check button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class ="bx bx-list-check"></i>';
    completedButton.classList.add("completeBtn");

    //add check button to the div
    todoDiv.appendChild(completedButton);

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class ="bx bx-trash"></i>';
    deleteButton.classList.add("deleteBtn");

    //add check button to the div
    todoDiv.appendChild(deleteButton);

    // add created div to the ul in html

    todoList.appendChild(todoDiv);
  });
}

function deleteLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;

  console.log(todos.indexOf(todoIndex));

  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}
