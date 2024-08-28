const $btns = document.querySelector("#btns");
const $startBtn = document.querySelector("#startBtn");
const $pauseBtn = document.querySelector("#pauseBtn");
const $resetBtn = document.querySelector("#resetBtn");

const $timerClock = document.querySelector("#timerClock");
const $input = document.querySelectorAll(".time");
const $hour = document.querySelector("#hour");
const $min = document.querySelector("#min");
const $sec = document.querySelector("#sec");

// 각 버튼, 기능 연결
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

// 숫자포맷 00으로 맞추기
const padNum = (num) => {
  return String(num).padStart(2, "0");
};

// 시간이 입력된 후에 버튼 활성화
$timerClock.addEventListener("change", (e) => {
  if (e.target.classList.contains("time")) {
    $startBtn.disabled = false;
    $resetBtn.disabled = false;
    $sec.value = padNum($sec.value);
  }
});

// 시계 기능
// 2. 60초가 1분, 60분이 1시간
const timer = () => {
  // 초 줄어들기
  const timerId = setInterval(() => {
    let secLeft = $sec.value;
    let minLeft = $min.value;

    if ($min.value > 0) {
      minLeft -= 1 / 60;
      Number.isInteger(minLeft) && ($min.value = padNum(minLeft));
    }

    if ($sec.value <= 0) {
      clearInterval(timerId);
      resetTimer();
      return;
    }

    secLeft -= 1;
    $sec.value = padNum(secLeft);
  }, 200);
};

// 타이머 시작하기
const startTimer = () => {
  $startBtn.classList.add("hidden");
  $pauseBtn.classList.remove("hidden");
  timer();
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
  $startBtn.disabled = true;
  $resetBtn.disabled = true;
};
