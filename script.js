let id = 1;

let todos = [];

function addTodo() {
  todos.push({
    title: document.querySelector("input").value,
    todo_id: "todo-" + id,
  });
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
  if (todos.length > 0)
    todos.forEach((todo) => {
      list.appendChild(TodoComponent(todo));
    });
}

function deleteLastTodo() {
  todos.splice(todos.length - 1, 1);
  render();
}

function TodoComponent({ title, todo_id }) {
  const newTodo = document.createElement("div");
  newTodo.setAttribute("id", `todo-${todo_id}`);
  newTodo.setAttribute("class", `todo`);

  newTodo.innerHTML = `<h3>${title}</h3>
    <button onClick="deleteTodo('${todo_id}')">delete</button>`;

  return newTodo;
}
