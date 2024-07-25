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
    if (newList.todo.length > 0) {
      addListUi(newList);
    } else {
      alert("내용을 입력해주세요");
    }
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
    return res.ok;
  } catch (error) {
    console.error(error);
  }
};

// 완료하기
// 체크박스 상태가 바뀌는 것을 감지해야함
// 상태가 바뀌면 서버 데이터 변경을 요청한다
// 데이터가 잘 변경되었는지 확인한다
// 체크박스의 ui를 데이터에 연결한다(!)
const checkList = async (id, checked) => {
  try {
    const res = await fetch(url + "/" + id, {
      method: "PATCH",
      headers: fetchHeaders,
      body: JSON.stringify({
        done: checked,
      }),
    });
    const checkedList = await res.json();
    return checkedList.done; // resolve 된거랑 동일!!
  } catch (error) {
    console.error(error);
  }
};

// 수정하기
// 버튼을 누르면 prompt가 열리고, 기존 텍스트가 적혀있다
// 확인 -> 최소글자수 체크 -> 수정반영 / alert
// ㄴ 수정이 반영되면 데이터가 서버에 patch 된다
// ㄴ 서버의 정보를 받아와서 화면에 보여준다
// 취소 -> 닫힘
const editList = async (id, text) => {
  try {
    const res = await fetch(url + "/" + id, {
      method: "PATCH",
      headers: fetchHeaders,
      body: JSON.stringify({
        todo: text,
      }),
    });
    const editedList = await res.json();
    return editedList.todo;
  } catch (error) {
    console.error(error);
  }
};

// list - button, input event
$ol.addEventListener("click", async (e) => {
  // console.log(e.target);
  if (e.target.classList.contains("btn-del")) {
    // 삭제버튼
    if (confirm("정말 삭제할까요?")) {
      const parentNode = e.target.parentNode;
      const delListResult = await delList(parentNode.id);
      delListResult && parentNode.remove();
      console.log("삭제되었습니다");
    } else {
      console.log("삭제가 취소되었습니다");
    }
  } else if (e.target.tagName === "INPUT") {
    // 체크박스
    // checkbox input onchange 으로도 구현가능
    const listId = e.target.closest("li").id;
    const checked = e.target.checked;
    e.target.checked = await checkList(listId, checked); // 서버에서 변경된 값 받아오기
  } else if (e.target.classList.contains("btn-edit")) {
    // 수정버튼
    const text = e.target.parentNode.querySelector("label").textContent;
    const editListTodo = async () => {
      const editPrompt = prompt("수정할 내용을 입력해주세요", text);
      if (editPrompt === null) {
        console.log("수정이 취소되었습니다");
      } else if (editPrompt.trim().length > 0) {
        const listId = e.target.parentNode.id;
        e.target.parentNode.querySelector("label").textContent = await editList(
          listId,
          editPrompt
        );
      } else {
        alert("내용을 입력해주세요");
        editListTodo();
      }
    };
    editListTodo();
  }
});

// 추가기능

// 오늘 날짜 보여주기
const $h1 = document.querySelector("h1");

let today = new Date();
const month = today.getMonth() + 1;
const date = today.getDate();

$h1.textContent = `${month}/${date} TODO LIST`;
