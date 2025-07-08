// leaderboard.js

document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("leaderboard-list");
  const res = await fetch("/api/leaderboard?mode=global");
  const data = await res.json();

  if (!data.leaderboard || data.leaderboard.length === 0) {
    list.innerHTML = "<li>No data yet.</li>";
    return;
  }

  data.leaderboard.forEach((entry) => {
    const li = document.createElement("li");
    let rankIcon = "";
    if (entry.rank === 1) rankIcon = "🥇";
    else if (entry.rank === 2) rankIcon = "🥈";
    else if (entry.rank === 3) rankIcon = "🥉";

    li.textContent = `${rankIcon} #${entry.rank} — User ${entry.userId} — ${entry.score} pts`;
    list.appendChild(li);
  });
});

function goHome() {
  window.location.href = "index.html";
}