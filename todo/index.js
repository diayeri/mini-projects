const $addInput = document.querySelector("#addInput");
const $addBtn = document.querySelector("#addBtn");
const $ol = document.querySelector("ol");
const $form = document.querySelector("form");

const addListUi = (text) => {
  const $li = document.createElement("li");
  const $label = document.createElement("label");

  const $btnDel = document.createElement("button");
  $btnDel.classList.add("btn-del");
  $btnDel.textContent = "삭제";

  const $btnEdit = document.createElement("button");
  $btnEdit.classList.add("btn-edit");
  $btnEdit.textContent = "수정";

  const $check = document.createElement("input");
  $check.setAttribute("type", "checkbox");

  $label.textContent = text.todo;
  $ol.appendChild($li).append($label, $btnDel, $btnEdit);
  $label.prepend($check);
};

const fetchTodos = async () => {
  const data = await fetch("http://localhost:3000/todos");
  const todos = await data.json();

  todos.forEach((list) => {
    addListUi(list);
  });
};
fetchTodos();

// 입력하기 통신
const addTodo = async (todoText) => {
  try {
    const req = await fetch("http://localhost:3000/todos", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: todoText,
        done: false,
      }),
    });
    const newList = await req.json();
    addListUi(newList);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Todos added ended, anyway");
  }
};

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = $addInput.value;
  addTodo(todoText);
  $addInput.value = "";
});
