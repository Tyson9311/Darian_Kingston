// game.js

document.addEventListener('DOMContentLoaded', () => {
  const continueBtn = document.getElementById('continueBtn');
  const levelBtn = document.getElementById('levelBtn');
  const leaderboardBtn = document.getElementById('leaderboardBtn');
  const helpBtn = document.getElementById('helpBtn');

  continueBtn.addEventListener('click', () => {
    const savedLevel = localStorage.getItem('currentLevel') || 1;
    window.location.href = `gameplay.html?level=${savedLevel}`;
  });

  levelBtn.addEventListener('click', () => {
    alert("Coming soon: All Levels screen.");
  });

  leaderboardBtn.addEventListener('click', () => {
    window.location.href = 'leaderboard.html';
  });

  helpBtn.addEventListener('click', () => {
    alert("Goal: Sort all colors into their correct tubes. Tap to pour!");
  });
});