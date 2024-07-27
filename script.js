const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const startButton = document.getElementById('start-button');
const endGameButton = document.getElementById('end-game');
const playAgainButton = document.getElementById('play-again');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const gameBoard = document.getElementById('game-board');
const playerTurn = document.getElementById('player-turn');
const gameOverMessage = document.getElementById('game-over');

let currentPlayer = 'X';
let player1Name = '';
let player2Name = '';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startButton.addEventListener('click', startGame);
endGameButton.addEventListener('click', endGame);
playAgainButton.addEventListener('click', resetGame);
gameBoard.addEventListener('click', handleCellClick);

function startGame() {
    player1Name = player1Input.value || 'Игрок 1';
    player2Name = player2Input.value || 'Игрок 2';
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    gameActive = true;
    updatePlayerTurn();
}

function endGame() {
    startScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
    resetGame();
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    gameOverMessage.classList.add('hidden');
    playAgainButton.classList.add('hidden');
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    updatePlayerTurn();
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) return;

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameOverMessage.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} выиграл!`;
        gameOverMessage.classList.remove('hidden');
        gameActive = false;
        playAgainButton.classList.remove('hidden');
        return;
    }

    if (!gameState.includes('')) {
        gameOverMessage.textContent = 'Ничья!';
        gameOverMessage.classList.remove('hidden');
        gameActive = false;
        playAgainButton.classList.remove('hidden');
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updatePlayerTurn();
}

function updatePlayerTurn() {
    playerTurn.textContent = `Ход игрока: ${currentPlayer === 'X' ? player1Name : player2Name} (${currentPlayer})`;
}