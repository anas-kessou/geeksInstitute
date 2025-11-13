const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const emojis = [
  { emoji: '😀', name: 'Smile' },
  { emoji: '🐶', name: 'Dog' },
  { emoji: '🌮', name: 'Taco' },
  { emoji: '🚗', name: 'Car' },
  { emoji: '🏀', name: 'Basketball' },
  { emoji: '🍕', name: 'Pizza' },
  { emoji: '🎸', name: 'Guitar' },
  { emoji: '🐱', name: 'Cat' },
  { emoji: '🌈', name: 'Rainbow' },
];

let leaderboard = []; 
function getRandomEmojiQuestion() {
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  const wrongOptions = emojis
    .filter(e => e.name !== randomEmoji.name)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const options = [...wrongOptions.map(o => o.name), randomEmoji.name]
    .sort(() => 0.5 - Math.random());

  return { emoji: randomEmoji.emoji, correct: randomEmoji.name, options };
}

app.get('/api/question', (req, res) => {
  const question = getRandomEmojiQuestion();
  res.json(question);
});

app.post('/api/guess', (req, res) => {
  const { player, guess, correct } = req.body;
  let result = { message: '', score: 0 };

  if (guess === correct) {
    result.message = 'Correct!';
    result.score = 1;
  } else {
    result.message = 'Wrong! The correct answer was ' + correct;
  }

  const existingPlayer = leaderboard.find(p => p.name === player);
  if (existingPlayer) {
    existingPlayer.score += result.score;
  } else {
    leaderboard.push({ name: player, score: result.score });
  }

  res.json(result);
});

app.get('/api/leaderboard', (req, res) => {
  const topScores = leaderboard
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  res.json(topScores);
});

app.listen(PORT, () => console.log(`Emoji Game running at http://localhost:${PORT}`));
