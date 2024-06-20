const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const messageElement = document.getElementById('message');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (isGameActive && cell.textContent === '') {
            cell.textContent = currentPlayer;
            cell.style.color = currentPlayer === 'X' ? '#e74c3c' : '#3498db';
            board[cell.dataset.index] = currentPlayer;
            if (checkWin()) {
                messageElement.textContent = `${currentPlayer} wins!`;
                isGameActive = false;
                highlightWinningCells();
            } else if (board.includes('')) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            } else {
                messageElement.textContent = `It's a draw!`;
                isGameActive = false;
            }
        }
    });
});

resetButton.addEventListener('click', resetGame);

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function highlightWinningCells() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => board[index] === currentPlayer)) {
            combination.forEach(index => {
                cells[index].style.backgroundColor = '#2ecc71';
            });
        }
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#444';
        cell.style.color = '#61dafb';
    });
    messageElement.textContent = '';
}
