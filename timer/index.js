const $btns = document.querySelector("#btns");
const $startBtn = document.querySelector("#startBtn");
const $pauseBtn = document.querySelector("#pauseBtn");
const $resetBtn = document.querySelector("#resetBtn");

const $input = document.querySelectorAll(".time");
const $hour = document.querySelector("#hour");
const $min = document.querySelector("#min");
const $sec = document.querySelector("#sec");

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
// 1. 1초씩 시간 줄어들기
// 2. 60초가 1분, 60분이 1시간
const timer = () => {};

// 타이머 시작하기
const startTimer = () => {
  // $startBtn.disabled = true;
  $startBtn.classList.add("hidden");
  $pauseBtn.classList.remove("hidden");

  const timerId = setInterval(() => {
    let timeLeft = $sec.value;

    if ($sec.value <= 0) {
      return clearInterval(timerId);
    }

    timeLeft -= 1;
    $sec.value = String(timeLeft).padStart(2, "0");
  }, 200);
};

// 타이머 멈추기
const pauseTimer = () => {};

// 타이머 초기화
// 1. 0초가 되면 초기화 실행
// 2. reset 버튼 누르면 초기화 실행
const resetTimer = () => {
  $input.forEach((i) => {
    i.value = "00";
  });
  $pauseBtn.classList.add("hidden");
  $startBtn.classList.remove("hidden");
};
