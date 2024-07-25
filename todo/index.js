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
  $check.classList.add("checkbox");
  $check.setAttribute("type", "checkbox");

  $label.textContent = text.todo;
  $ol.appendChild($li).append($label, $btnDel, $btnEdit);
  $label.prepend($check);
};

// 불러오기
const fetchTodos = async () => {
  const data = await fetch("http://localhost:3000/todos");
  const todos = await data.json();

  todos.forEach((list) => {
    addListUi(list);
  });
};
fetchTodos();

// 추가하기
const addList = async (todoText) => {
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
    console.log("Adding list ended, anyway");
  }
};

// form - submit event
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = $addInput.value;
  addList(todoText);
  $addInput.value = "";
});

// 완료하기
const checkList = async (todoText) => {};
// 삭제하기
const delList = async (todoText) => {};
// 수정하기
const editList = async (todoText) => {};

// list - button, input event
$ol.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-del")) {
    console.log("del", e.target);
  } else if (e.target.classList.contains("checkbox")) {
    console.log("check", e.target);
  } else if (e.target.classList.contains("btn-edit")) {
    console.log("edit", e.target);
  }
});
