let id = 1;

let todos = [];
let editId = null;
let search = "";

function addTodo() {
  if (search !== "") {
    search = "";
  }

  todos.push({
    title: document.querySelector("#input-todo-title").value,
    todo: document.querySelector("#input-todo").value,
    todo_id: "todo-" + id,
  });
  document.querySelector("#input-todo-title").value = "";
  document.querySelector("#input-todo").value = "";
  id++;
  render();
}

function deleteTodo(todo_id) {
  const index = todos.findIndex((todo) => todo.todo_id === todo_id);
  if (index == -1) {
    alert("Todo not exist");
    return;
  }
  todos.splice(index, 1);
  render();
}

function editTodo(id) {
  editId = id;
  render();
}

function updateTodo(id) {
  const index = todos.findIndex((todo) => todo.todo_id === id);
  if (index == -1) {
    alert("Todo not exist");
    return;
  }
  const title = document.querySelector("#edit-title-" + id).value;
  const todo = document.querySelector("#edit-todo-" + id).value;
  todos[index].title = title;
  todos[index].todo = todo;
  editId = null;
  render();
}

function findTodo() {
  search = document.querySelector("#input-todo-title").value;
  render();
}

function TodoComponent({ title, todo, todo_id }) {
  const newTodo = document.createElement("div");
  newTodo.setAttribute("id", `todo-${todo_id}`);
  newTodo.setAttribute("class", `todo`);
  if (editId === todo_id) {
    //
    newTodo.innerHTML = `
    <input value="${title}" id="edit-title-${todo_id}" class="edit-input"></input>
     <textarea value="${todo}" id="edit-todo-${todo_id}" class="edit-input">${todo}</textarea>
    <div class="todo-button-cnt">
      <button onClick="updateTodo('${todo_id}')" class="icon-button update">
        <img class="icon"  src="https://img.icons8.com/?size=100&id=6Dz9xBnxD2Il&format=png&color=000000" />
      </button>
    </div>`;
    //
  } else {
    //
    newTodo.innerHTML = `<h3 class="todo-text">${title}</h3>
    <p class="todo-text">${todo}</p>
    <div class="todo-button-cnt" >
      <button onClick="deleteTodo('${todo_id}')"  class="icon-button del">
        <img class="icon"  src="https://img.icons8.com/?size=100&id=4887&format=png&color=000000" />
      </button>
      <button onClick="editTodo('${todo_id}')" class="icon-button edit">
        <img class="icon"  src="https://img.icons8.com/?size=100&id=15049&format=png&color=000000" />
      </button>
    </div>
    `;
  }

  return newTodo;
}

function render() {
  const list = document.querySelector("#todo-list");
  list.innerHTML = "";

  if (todos.length > 0) {
    let filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    );
    // list.innerHTML = " <h1>Todos List</h1>";
    filtered.forEach((todo) => {
      list.appendChild(TodoComponent(todo));
    });
  }
}
