function addScore(score) {
  return fetch(`https://snake-game-mongo-psl.herokuapp.com/score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(score),
  })
}

function fetchLeaders() {
  return fetch('https://snake-game-mongo-psl.herokuapp.com/score/leaderboard')
    .then((res) => res.json())
    .then((res) => res.data.result)
}

export default { addScore, fetchLeaders }
