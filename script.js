const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => handleCellClick(index));
    boardElement.appendChild(cellElement);
  });
}

function handleCellClick(index) {
  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  renderBoard();
  if (checkWin()) {
    statusElement.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  } else if (board.every(cell => cell !== '')) {
    statusElement.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winCombos.some(combo => {
    return combo.every(i => board[i] === currentPlayer);
  });
}

function resetGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

resetButton.addEventListener('click', resetGame);
renderBoard();
