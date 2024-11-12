const players = { 1: 'Katsimon', 2: 'Terzi', 3: 'Yora' };
const choices = { 1: null, 2: null, 3: null };

function choose(choice, player) {
  choices[player] = choice;
  document.getElementById(`player${player}`).querySelectorAll("button").forEach(button => {
    button.disabled = true;
  });
}

function determineWinner() {
  const results = Object.values(choices);
  
  if (results.includes(null)) {
    document.getElementById('result').textContent = "All players need to make a choice!";
    return;
  }
  
  const uniqueChoices = [...new Set(results)];

  if (uniqueChoices.length === 1) {
    document.getElementById('result').textContent = "It's a tie! All players chose " + uniqueChoices[0];
  } else if (uniqueChoices.length === 3) {
    document.getElementById('result').textContent = "It's a tie! Every choice was picked.";
  } else {
    const wins = { rock: "scissors", scissors: "paper", paper: "rock" };
    const winners = [];

    for (let player in choices) {
      const otherChoices = results.filter(c => c !== choices[player]);
      if (otherChoices.every(c => wins[choices[player]] === c)) {
        winners.push(players[player]);
      }
    }

    if (winners.length > 0) {
      document.getElementById('result').textContent = "Winner(s): " + winners.join(" and ");
    } else {
      document.getElementById('result').textContent = "It's a tie!";
    }
  }
  
  resetGame();
}

function resetGame() {
  Object.keys(choices).forEach(player => choices[player] = null);
  document.querySelectorAll("button").forEach(button => button.disabled = false);
}
