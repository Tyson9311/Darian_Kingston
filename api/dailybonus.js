// /api/dailybonus.js

export default async function handler(req, res) {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  const storageKey = `bonus_${userId}`;
  const today = new Date().toISOString().split('T')[0];

  let data = JSON.parse(await get(storageKey) || 'null');

  if (data === today) {
    return res.status(200).json({ status: 'already_claimed' });
  }

  await set(storageKey, JSON.stringify(today));

  // Optional: increment user score in database
  return res.status(200).json({ status: 'bonus_claimed', bonus: 20 });
}

// Simulated temporary in-memory storage (replace with DB later)
const db = new Map();
const get = async (key) => db.get(key);
const set = async (key, value) => db.set(key, value);
