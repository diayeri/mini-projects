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
  $label.setAttribute("for", `checkbox-${list.id}`);

  const $btnDel = document.createElement("button");
  $btnDel.classList.add("btn-del");
  $btnDel.textContent = "삭제";

  const $btnEdit = document.createElement("button");
  $btnEdit.classList.add("btn-edit");
  $btnEdit.textContent = "수정";

  const $check = document.createElement("input");
  $check.setAttribute("type", "checkbox");
  $check.id = `checkbox-${list.id}`;
  $check.checked = list.done; // 체크상태 불러오기

  $label.textContent = list.todo;
  $ol.appendChild($li).append($check, $label, $btnDel, $btnEdit);
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
    console.error(error);
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
    console.error(error);
  }
};

// 완료하기
// 체크박스 상태가 바뀌는 것을 감지해야함
// 상태가 바뀌면 서버 데이터 변경을 요청한다
// 데이터가 잘 변경되었는지 확인한다
// 데이터에 체크박스의 ui를 연결한다(?)
const checkList = async (id, checked) => {
  try {
    const res = await fetch(url + "/" + id, {
      method: "PATCH",
      headers: fetchHeaders,
      body: JSON.stringify({
        done: checked,
      }),
    });
    const body = await res.json();
    return body.done; // resolve 된거랑 동일!!
  } catch (error) {
    console.error(error);
  }
};

// 수정하기
const editList = async (text) => {};

// list - button, input event
$ol.addEventListener("click", async (e) => {
  // console.log(e.target);
  if (e.target.classList.contains("btn-del")) {
    if (confirm("정말 삭제할까요?")) {
      const parentNode = e.target.parentNode;
      const delListResult = delList(parentNode.id);
      delListResult && parentNode.remove();
      console.log("삭제되었습니다");
    } else {
      console.log("삭제가 취소되었습니다");
    }
  } else if (e.target.tagName === "INPUT") {
    const listId = e.target.closest("li").id;
    const checked = e.target.checked;
    // console.log(listId, checked);
    e.target.checked = await checkList(listId, checked); // 서버에서 변경된 값 받아오기
    const state = await checkList(listId, checked);
    console.log("체크박스 상태 변경", e.target.checked);
    console.log("체크박스 상태 변경", state);
  } else if (e.target.classList.contains("btn-edit")) {
    console.log("edit", e.target);
  }
});
// checkbox input onchange
