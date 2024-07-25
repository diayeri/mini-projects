const url = "http://localhost:3000/todos";
const fetchHeaders = { "Content-Type": "application/json" };

const $addInput = document.querySelector("#addInput");
const $addBtn = document.querySelector("#addBtn");
const $ol = document.querySelector("ol");
const $form = document.querySelector("form");

const addListUi = (list) => {
  const $li = document.createElement("li");
  $li.id = list.id;
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

  $label.textContent = list.todo;
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
    const req = await fetch(url, {
      method: "POST",
      header: fetchHeaders,
      body: JSON.stringify({
        todo: todoText,
        done: false,
      }),
    });
    const newList = await req.json(); // 새로 추가된 요소
    addListUi(newList);
  } catch (error) {
    console.log(error);
  }
};

// form - submit event
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = $addInput.value;
  addList(text);
  $addInput.value = "";
});

// 삭제하기
// 삭제누른 리스트의 데이터 아이디값을 가져와야 한다
// 리스트 아이디를 데이터 아이디와 동일하게 세팅하자
// 데이터를 삭제한 후, 화면에도 반영하자 -> 지우려는 통신이 확인되면, ui상에서도 지우기
const delList = async (id) => {
  try {
    const res = await fetch(url + "/" + id, {
      method: "DELETE",
    });
    res.ok ? true : false;
  } catch (error) {
    console.log("ERR", error);
  }
};

// 완료하기
const checkList = async (text) => {};

// 수정하기
const editList = async (text) => {};

// list - button, input event
$ol.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-del")) {
    if (confirm("정말 삭제할까요?")) {
      const parentNode = e.target.parentNode;
      const delListResult = delList(parentNode.id);
      delListResult && parentNode.remove();
      console.log("삭제되었습니다");
    } else {
      console.log("삭제가 취소되었습니다");
    }
  } else if (e.target.classList.contains("checkbox")) {
    console.log("check", e.target);
  } else if (e.target.classList.contains("btn-edit")) {
    console.log("edit", e.target);
  }
});
