// profile.js

document.addEventListener("DOMContentLoaded", () => {
  const name = window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || "Guest";
  const level = parseInt(localStorage.getItem("currentLevel") || "1");
  const score = parseInt(localStorage.getItem("score") || "0");
  const gender = localStorage.getItem("gender") || "Not set";
  const pfp = localStorage.getItem("profilePic");

  document.getElementById("profile-name").textContent = name;
  document.getElementById("profile-level").textContent = level;
  document.getElementById("profile-score").textContent = score;
  document.getElementById("profile-gender").textContent = gender;
  document.getElementById("profile-rarity").textContent = getRarity(level);

  if (pfp) {
    const img = document.createElement("img");
    img.src = pfp;
    img.alt = "Profile Picture";
    img.style.width = "100px";
    img.style.borderRadius = "50%";
    img.style.boxShadow = "0 0 10px cyan";
    document.getElementById("profile-pic").appendChild(img);
  }
});

function getRarity(level) {
  if (level >= 251) return "👑 Legend";
  if (level >= 201) return "🧠 Master";
  if (level >= 151) return "🔮 Expert";
  if (level >= 101) return "🛡️ Hard";
  if (level >= 31)  return "⚔️ Skilled";
  return "🔰 Rookie";
}

function setGender(value) {
  localStorage.setItem("gender", value);
  document.getElementById("profile-gender").textContent = value;
}

function goHome() {
  window.location.href = "index.html";
}