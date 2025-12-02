
const timer = {
  milsec: 0,
  sec: 0,
  min: 0
}

const timerEl = document.querySelector("#timer");


const stopBtn = document.querySelector("#stop-btn")
const startBtn = document.querySelector("#start-btn")
const resetBtn = document.querySelector("#Reset-btn");

const lapBtn = document.querySelector("#Lap-btn");

const lapList = [];

let intervalID;

function updateDisplay() {

  timerEl.textContent = `${String(timer.min).padStart(2, "0")}:${String(timer.sec).padStart(2, "0")}:${String(timer.milsec).padStart(2, "0")}`
}

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = false;
  intervalID = setInterval(() => {

    timer.milsec++
    if (timer.milsec === 100) {
      timer.sec++
      timer.milsec = 0;
    }
    if (timer.sec === 60) {
      timer.min++
      timer.sec = 0;
    }

    updateDisplay();

  }, 10)
})

stopBtn.addEventListener("click", () => {

  clearInterval(intervalID);
  startBtn.disabled = false;
  resetBtn.disabled = false;
  lapBtn.disabled = true

});

const lapContainer = document.querySelector(".lap-container");

lapContainer.style.visibility = "hidden";

resetBtn.addEventListener("click", () => {

  timer.sec = 0;
  timer.min = 0;
  timer.milsec = 0;
  lapContainer.style.visibility = "hidden";
  lapDisplay.innerHTML = ""
  updateDisplay()

});

const lapDisplay = document.querySelector(".lap-display");





lapBtn.addEventListener("click", () => {

  lapContainer.style.visibility = "visible";

  const lap = {
    milsec: timer.milsec,
    sec: timer.sec,
    min: timer.min
  }

  lapList.push(lap);

  renderLap();
});

function renderLap() {
  let lapHtml = "";

  lapList.forEach(lapObj => {
    const { milsec, sec, min } = lapObj
    const html = `

  <div class="js-lap-display">

    <span>&bull;</span>
    <span>
      ${String(min).padStart(2, "0")}:
      ${String(sec).padStart(2, "0")}:
      ${String(milsec).padStart(2, "0")}
    </span>
    <button class="delete-btn">X</button>
  </div>
`;
    lapHtml += html;
  });

  lapDisplay.innerHTML = lapHtml;

  const deleteBtns = document.querySelectorAll(".delete-btn")

  deleteBtns.forEach((deleteBtn, index) => {
    deleteBtn.addEventListener("click", () => {
      lapList.splice(index, 1)
      renderLap();
    })
  })
}

