// bot.js (Node.js)
const TelegramBot = require('node-telegram-bot-api');
const token = '8190386762:AAHD-OiaKt5vxDIupxZ2skLQfwDAHLN8Gwc';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name;

  const welcomeText = `
👋 Welcome to MasterSort 251!

🎮 A colorful puzzle game where you sort liquids into glowing neon tubes — level by level!

🧠 Total 251 levels | ⏱ Timed challenges | 🔰 Rarity tiers | 🏆 Leaderboard

✨ Play now and see how far you can go!

Use these commands:
- /mystat — View your profile
- /dailybonus — Claim your daily bonus
- /leaderboard — View top players
  `;

  bot.sendMessage(chatId, welcomeText, {
    reply_markup: {
      inline_keyboard: [[
        {
          text: "🚀 Play Now",
          web_app: { url: "https://darian-kingston.vercel.app/" }
        }
      ]]
    }
  });
});
