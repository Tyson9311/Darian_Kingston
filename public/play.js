// play.js

let currentLevel = parseInt(new URLSearchParams(window.location.search).get('level')) || 1;
let timerInterval, timeLeft;
let selectedTubeIndex = null;
let tubes = [];

const tubeContainer = document.getElementById('tubeContainer');
const levelInfo = document.getElementById('level-info');
const timerFill = document.getElementById('timer-fill');
const winScreen = document.getElementById('winScreen');
const loseScreen = document.getElementById('loseScreen');

const difficultyTimes = [
  { max: 30, time: 90 },
  { max: 100, time: 120 },
  { max: 150, time: 150 },
  { max: 200, time: 165 },
  { max: 250, time: 180 },
  { max: 251, time: 180 }
];

function getTimeForLevel(level) {
  return difficultyTimes.find(d => level <= d.max).time;
}

function startLevel(level) {
  levelInfo.textContent = `Level ${level}`;
  generateTubes();
  renderTubes();
  startTimer(getTimeForLevel(level));
}

function generateTubes() {
  const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
  const items = [...colors, ...colors];
  while (items.length < 12 * 4) items.push(null);
  items.sort(() => Math.random() - 0.5);
  tubes = [];
  for (let i = 0; i < 12; i++) {
    tubes.push(items.slice(i * 4, (i + 1) * 4));
  }
}

function renderTubes() {
  tubeContainer.innerHTML = '';
  tubes.forEach((tube, index) => {
    const div = document.createElement('div');
    div.className = 'tube';
    div.dataset.index = index;
    div.onclick = () => handleTubeTap(index);
    tube.slice().reverse().forEach(color => {
      const slot = document.createElement('div');
      slot.className = 'tube-slot';
      if (color) slot.style.background = color;
      div.appendChild(slot);
    });
    if (selectedTubeIndex === index) {
      div.classList.add('selected');
    }
    tubeContainer.appendChild(div);
  });
}

function handleTubeTap(index) {
  if (selectedTubeIndex === null) {
    selectedTubeIndex = index;
  } else if (selectedTubeIndex === index) {
    selectedTubeIndex = null;
  } else {
    attemptPour(selectedTubeIndex, index);
    selectedTubeIndex = null;
  }
  renderTubes();
  checkWin();
}

function attemptPour(from, to) {
  const source = tubes[from];
  const target = tubes[to];
  const fromColor = source.findLast(color => color);
  if (!fromColor) return;
  const fromIndex = source.lastIndexOf(fromColor);
  const pourCount = source.slice(fromIndex).filter(c => c === fromColor).length;
  const toEmptyCount = target.filter(c => !c).length;
  const toTop = target.findLast(c => c);
  if ((toTop === undefined || toTop === fromColor) && toEmptyCount >= pourCount) {
    for (let i = 0; i < pourCount; i++) {
      const idx = source.lastIndexOf(fromColor);
      source[idx] = null;
    }
    for (let i = 0; i < 4; i++) {
      if (!target[i]) {
        target[i] = fromColor;
        pourCount--;
        if (pourCount === 0) break;
      }
    }
  }
}

function checkWin() {
  const allSorted = tubes.every(tube => {
    const filled = tube.filter(Boolean);
    return filled.length === 0 || new Set(filled).size === 1 && filled.length === 4;
  });
  if (allSorted) {
    completeLevel();
  }
}

function startTimer(duration) {
  timeLeft = duration;
  updateTimerUI();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showLoseScreen();
    }
  }, 1000);
}

function updateTimerUI() {
  const total = getTimeForLevel(currentLevel);
  const percent = (timeLeft / total) * 100;
  timerFill.style.width = percent + '%';
  timerFill.style.background = percent < 20 ? 'red' : percent < 50 ? 'yellow' : 'lime';
}

function completeLevel() {
  clearInterval(timerInterval);
  localStorage.setItem('currentLevel', currentLevel + 1);
  const currentScore = parseInt(localStorage.getItem('score') || '0');
  const newScore = currentScore + 40;
  localStorage.setItem('score', newScore);
  document.querySelector('#winScreen h2').textContent = `🎉 Level Complete! +40 Points\nTotal: ${newScore} pts`;
  winScreen.style.display = 'block';
}

function showLoseScreen() {
  loseScreen.style.display = 'block';
}

function nextLevel() {
  window.location.href = `gameplay.html?level=${currentLevel + 1}`;
}

function retryLevel() {
  window.location.reload();
}

function goHome() {
  window.location.href = 'index.html';
}

startLevel(currentLevel);