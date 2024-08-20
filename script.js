let id = 1;

let todos = [];
let editId = null;
let search = "";
function addTodo() {
  todos.push({
    title: document.querySelector("#input-todo").value,
    todo_id: "todo-" + id,
  });
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

function render() {
  const list = document.querySelector("#todo-list");
  list.innerHTML = "";

  if (todos.length > 0) {
    let filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    );
    filtered.forEach((todo) => {
      list.appendChild(TodoComponent(todo));
    });
  }
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
  const value = document.querySelector("#edit-" + id).value;
  todos[index].title = value;
  editId = null;
  render();
}

function findTodo() {
  search = document.querySelector("#input-todo").value;
  render();
}

function TodoComponent({ title, todo_id }) {
  const newTodo = document.createElement("div");
  newTodo.setAttribute("id", `todo-${todo_id}`);
  newTodo.setAttribute("class", `todo`);
  if (editId === todo_id) {
    newTodo.innerHTML = `<input value="${title}" id="edit-${todo_id}"></input>
    <button onClick="updateTodo('${todo_id}')">update</button>`;
  } else {
    newTodo.innerHTML = `<h3>${title}</h3>
    <div >
    <button onClick="deleteTodo('${todo_id}')"  class="icon-button">
    <img class="icon"  src="https://img.icons8.com/?size=100&id=4887&format=png&color=000000" />
    </button>
    <button onClick="editTodo('${todo_id}')" class="icon-button">
    <img class="icon"  src="https://img.icons8.com/?size=100&id=15049&format=png&color=000000" />
    </button>
    </div>
    `;
  }

  return newTodo;
}
