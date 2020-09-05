/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, gamePlaying;

init()



document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        // 1 Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. display the number 
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. update the round score if the rolled number was not a 1
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // next player
            nextPlayer()
        }

    }
})


// hold button functions

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // add  current score to the global score
        score[activePlayer] += roundScore
        // update the ui 
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer]
        // first one to have 100 wins
        if (score[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active')
            gamePlaying = false;
        } else {
            nextPlayer()
        }
    }

})

// function for next player
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // making round score 0
    roundScore = 0

    //changing the roundscore display 
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // toggling the active class to change the styling
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // changing the display property for next player
    document.querySelector('.dice').style.display = 'none';
}


// for new button 

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
    score = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('#name-0').textContent = 'Player 1'
    document.querySelector('#name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
}
