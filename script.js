// Selecting Elements
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

// Timer Variables
let minutes = 0, seconds = 0, milliseconds = 0;
let interval;
let isRunning = false;

// Start/Pause Functionality
startPauseBtn.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(interval);
        startPauseBtn.textContent = "Start";
        startPauseBtn.classList.remove("primary");
        startPauseBtn.classList.add("secondary");
    } else {
        interval = setInterval(updateTime, 10);
        startPauseBtn.textContent = "Pause";
        startPauseBtn.classList.remove("secondary");
        startPauseBtn.classList.add("primary");
    }
    isRunning = !isRunning;
});

// Update Timer
function updateTime() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    // Update Display
    minutesEl.textContent = formatTime(minutes);
    secondsEl.textContent = formatTime(seconds);
    millisecondsEl.textContent = formatTime(milliseconds / 10);
}

// Reset Functionality
resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    isRunning = false;
    startPauseBtn.textContent = "Start";
    startPauseBtn.classList.remove("primary");
    startPauseBtn.classList.add("secondary");
    lapList.innerHTML = "";
    // Reset Display
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    millisecondsEl.textContent = "00";
});

// Lap Functionality
lapBtn.addEventListener("click", () => {
    if (isRunning) {
        const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds / 10)}`;
        const lapItem = document.createElement("li");
        lapItem.innerHTML = `Lap ${lapList.children.length + 1} <span>${lapTime}</span>`;
        lapList.appendChild(lapItem);
    }
});

// Format Time
function formatTime(time) {
    return time < 10 ? `0${Math.floor(time)}` : `${Math.floor(time)}`;
}
