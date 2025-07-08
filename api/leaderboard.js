// /api/leaderboard.js

const scores = new Map(); // In-memory score tracking (replace with DB)

export default async function handler(req, res) {
  const { mode, userId, score } = req.query;

  if (!mode) return res.status(400).json({ error: 'Missing mode' });

  if (mode === 'submit') {
    if (!userId || !score) return res.status(400).json({ error: 'Missing userId or score' });
    scores.set(userId, parseInt(score));
    return res.status(200).json({ status: 'score_submitted' });
  }

  if (mode === 'global') {
    const top = [...scores.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 25)
      .map(([uid, pts], i) => ({
        rank: i + 1,
        userId: uid,
        score: pts
      }));
    return res.status(200).json({ leaderboard: top });
  }

  return res.status(400).json({ error: 'Invalid mode' });
}