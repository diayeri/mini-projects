const $btns = document.querySelector("#btns");
const $startBtn = document.querySelector("#startBtn");
const $pauseBtn = document.querySelector("#pauseBtn");
const $resetBtn = document.querySelector("#resetBtn");

$btns.addEventListener("click", (e) => {
  if (e.target.id === "startBtn") {
    startTimer();
  }
  if (e.target.id === "pauseBtn") {
    pauseTimer();
  }
  if (e.target.id === "resetBtn") {
    resetTimer();
  }
});

// 시계 기능
// 1. 60초가 1분, 60분이 1시간
// 2. 1초씩 시간 줄어들기
const timer = () => {};

// 타이머 시작하기
const startTimer = () => {
  // $startBtn.disabled = true;
  $startBtn.classList.add("hidden");
  $pauseBtn.classList.remove("hidden");
};

// 타이머 멈추기
const pauseTimer = () => {};

// 타이머 초기화
// 1. 0초가 되면 실행
// 2. reset 버튼 누르면 실행
const resetTimer = () => {};
