# 🧩 MasterSort 251

**MasterSort 251** is a tap-based color-sorting puzzle game designed as a **Telegram WebApp**, where players solve increasingly challenging levels by pouring colored liquids into neon tubes.

- 🔮 Total Levels: **251**
- ⏱️ Time-based Challenges (Easy to Hard)
- 🧠 Offline progress + Rarity Tiers
- 🏆 Global & Group Leaderboards
- 🎮 Built with HTML, CSS, JavaScript (Vanilla)
- 🌐 Hosted on Vercel, connected via Telegram Bot

---

## 🎮 How to Play

- Tap on a tube to select its top color
- Tap another tube to pour if it's a legal move
- Win when all tubes are sorted by color
- Complete levels to unlock the next ones
- Earn 🪙 **+40 points per level**

---

## 🔥 Features

| Feature               | Details                                        |
|-----------------------|------------------------------------------------|
| 🎯 Tap-to-play        | No drag-and-drop, just clean tap logic        |
| 🧪 12 Neon Tubes      | Active puzzle grid with glowing animation      |
| ⏰ Timed Levels        | Easy to Hard with 1–3 minute timers            |
| 🧩 251 Total Levels    | Designed to increase in complexity             |
| 👤 Profile (`/mystat`) | Name, score, level, rarity, gender, PFP        |
| 🎁 Daily Bonus        | Claim via `/dailybonus` in group/private chat |
| 🏆 Leaderboards       | Global & group-wise with `/leaderboard`       |
| 👑 Rarity Tiers        | Rookie → Skilled → Hard → Expert → Master → Legend |
| 💾 Local Progress     | Resumes from last unlocked level              |

---

## 🛠 Tech Stack

- **Frontend**: HTML, CSS, Vanilla JS
- **Backend**: Vercel Functions (`/api/leaderboard.js`, `/api/dailybonus.js`)
- **Telegram WebApp**: `Telegram.WebApp.initDataUnsafe`
- **Storage**: `localStorage` for progress, simulated memory DB for demo

---

## 📦 Folder Structure

```
MasterSort_251/
├── README_MasterSort_251.md        ✅ Project overview
├── LICENSE                         ✅ MIT License
│
├── public/                         # Static frontend (WebApp)
│   ├── index.html                  ✅ Home screen
│   ├── gameplay.html               ✅ Game screen
│   ├── profile.html                ✅ /mystat profile screen
│   ├── leaderboard.html            ✅ Global leaderboard screen
│   ├── styles.css                  ✅ Neon theme styles
│   ├── game.js                     ✅ Home navigation logic
│   ├── play.js                     ✅ Game logic (tube pouring, scoring)
│   ├── profile.js                  ✅ Loads user profile & rarity
│   └── leaderboard.js              ✅ Fetches and displays top 25
│
├── api/                            # Backend API for scoring & bonus
│   ├── dailybonus.js               ✅ Handles /dailybonus claim logic
│   └── leaderboard.js              ✅ Handles /leaderboard data fetch/submit
│
├── telegram-bot/                   # 🤖 Telegram bot logic folder
│   └── bot.js                      ✅ Bot code (includes /start, buttons)
│
└── (vercel.json)                   ❌ You can skip this unless you need advanced routing

```

---

## 🚀 Deployment

1. Host frontend & API using **[Vercel](https://vercel.com/)**
2. Set WebApp URL using **[@BotFather](https://t.me/BotFather)**:
   ```
   /setdomain
   https://your-vercel-url.vercel.app
   ```
3. Configure Bot Commands:
   ```
   /mystat - View your game profile
   /leaderboard - Top 25 global & chat players
   /dailybonus - Claim daily bonus points
   ```

---

## ✨ Developed & Designed by

**🎮 Darian Kingston**  
With a vision to make addictive and smooth mini-games on Telegram WebApps.
