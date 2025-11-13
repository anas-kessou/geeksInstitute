const emojiDiv = document.getElementById('emoji');
const optionsDiv = document.getElementById('options');
const feedback = document.getElementById('feedback');
const leaderboardList = document.getElementById('leaderboard');
const playerInput = document.getElementById('playerName');

let currentQuestion = null;

async function fetchQuestion() {
  const res = await fetch('/api/question');
  currentQuestion = await res.json();

  emojiDiv.textContent = currentQuestion.emoji;
  optionsDiv.innerHTML = '';

  currentQuestion.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => submitGuess(option);
    optionsDiv.appendChild(btn);
  });
}

async function submitGuess(guess) {
  const player = playerInput.value.trim() || 'Anonymous';
  const res = await fetch('/api/guess', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      player,
      guess,
      correct: currentQuestion.correct
    })
  });

  const data = await res.json();
  feedback.textContent = data.message;
  fetchLeaderboard();

  setTimeout(() => {
    feedback.textContent = '';
    fetchQuestion();
  }, 1200);
}

async function fetchLeaderboard() {
  const res = await fetch('/api/leaderboard');
  const data = await res.json();

  leaderboardList.innerHTML = '';
  data.forEach(player => {
    const li = document.createElement('li');
    li.textContent = `${player.name}: ${player.score}`;
    leaderboardList.appendChild(li);
  });
}


fetchQuestion();
fetchLeaderboard();
