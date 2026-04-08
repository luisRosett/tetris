// Tetris Game

// Game Constants
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLORS = [
    '#000000', // Empty
    '#00f0f0', // I - Cyan
    '#f0f000', // O - Yellow
    '#a000f0', // T - Purple
    '#00f000', // S - Green
    '#f00000', // Z - Red
    '#0000f0', // J - Blue
    '#f0a000'  // L - Orange
];

// Tetromino Shapes
const SHAPES = [
    [[1, 1, 1, 1]], // I
    [[2, 2], [2, 2]], // O
    [[0, 3, 0], [3, 3, 3]], // T
    [[0, 4, 4], [4, 4, 0]], // S
    [[5, 5, 0], [0, 5, 5]], // Z
    [[6, 0, 0], [6, 6, 6]], // J
    [[0, 0, 7], [7, 7, 7]]  // L
];

// Game State
let canvas, ctx, nextCanvas, nextCtx;
let board = [];
let currentPiece = null;
let nextPiece = null;
let score = 0;
let level = 1;
let lines = 0;
let gameRunning = false;
let gamePaused = false;
let gameLoop = null;
let dropSpeed = 500;

// Initialize Game
function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    nextCanvas = document.getElementById('nextCanvas');
    nextCtx = nextCanvas.getContext('2d');
    
    // Initialize board
    board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
    
    // Event Listeners
    document.getElementById('startBtn').addEventListener('click', startGame);
    document.getElementById('pauseBtn').addEventListener('click', togglePause);
    document.getElementById('resetBtn').addEventListener('click', resetGame);
    document.getElementById('restartBtn').addEventListener('click', restartGame);
    document.addEventListener('keydown', handleKeyPress);
    
    // Draw initial empty board
    drawBoard();
    drawNextPiece();
}

// Game Logic
function startGame() {
    if (gameRunning) return;
    
    gameRunning = true;
    gamePaused = false;
    score = 0;
    level = 1;
    lines = 0;
    board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
    
    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('gameOver').classList.add('hidden');
    
    updateScore();
    spawnPiece();
    gameLoop = setInterval(gameStep, dropSpeed);
}

function togglePause() {
    if (!gameRunning) return;
    
    gamePaused = !gamePaused;
    document.getElementById('pauseBtn').textContent = gamePaused ? 'Resume' : 'Pause';
    
    if (gamePaused) {
        clearInterval(gameLoop);
    } else {
        gameLoop = setInterval(gameStep, dropSpeed);
    }
}

function resetGame() {
    clearInterval(gameLoop);
    gameRunning = false;
    gamePaused = false;
    score = 0;
    level = 1;
    lines = 0;
    board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
    currentPiece = null;
    nextPiece = null;
    
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('pauseBtn').textContent = 'Pause';
    document.getElementById('gameOver').classList.add('hidden');
    
    updateScore();
    drawBoard();
    drawNextPiece();
}

function restartGame() {
    resetGame();
    startGame();
}

function gameStep() {
    if (!movePiece(0, 1)) {
        mergePiece();
        clearLines();
        spawnPiece();
        
        if (!isValidMove(currentPiece, 0, 0)) {
            gameOver();
        }
    }
    drawBoard();
}

function spawnPiece() {
    if (!nextPiece) {
        nextPiece = createPiece();
    }
    
    currentPiece = nextPiece;
    nextPiece = createPiece();
    
    drawNextPiece();
}

function createPiece() {
    const shapeIndex = Math.floor(Math.random() * SHAPES.length);
    const shape = SHAPES[shapeIndex];
    
    return {
        shape: shape,
        x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
        y: 0,
        color: shapeIndex + 1
    };
}

function movePiece(dx, dy) {
    if (isValidMove(currentPiece, dx, dy)) {
        currentPiece.x += dx;
        currentPiece.y += dy;
        return true;
    }
    return false;
}

function rotatePiece() {
    const rotated = currentPiece.shape[0].map((_, i) =>
        currentPiece.shape.map(row => row[i]).reverse()
    );
    
    const oldShape = currentPiece.shape;
    currentPiece.shape = rotated;
    
    if (!isValidMove(currentPiece, 0, 0)) {
        currentPiece.shape = oldShape;
    } else {
        drawBoard();
    }
}

function isValidMove(piece, dx, dy) {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x]) {
                const newX = piece.x + x + dx;
                const newY = piece.y + y + dy;
                
                if (newX < 0 || newX >= COLS || newY >= ROWS) {
                    return false;
                }
                
                if (newY >= 0 && board[newY][newX]) {
                    return false;
                }
            }
        }
    }
    return true;
}

function mergePiece() {
    for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x]) {
                const boardY = currentPiece.y + y;
                const boardX = currentPiece.x + x;
                if (boardY >= 0) {
                    board[boardY][boardX] = currentPiece.color;
                }
            }
        }
    }
}

function clearLines() {
    let linesCleared = 0;
    
    for (let y = ROWS - 1; y >= 0; y--) {
        if (board[y].every(cell => cell !== 0)) {
            board.splice(y, 1);
            board.unshift(Array(COLS).fill(0));
            linesCleared++;
            y++; // Check the same row again
        }
    }
    
    if (linesCleared > 0) {
        lines += linesCleared;
        score += linesCleared * 100 * level;
        level = Math.floor(lines / 10) + 1;
        
        // Adjust speed based on level
        dropSpeed = Math.max(100, 500 - (level - 1) * 50);
        
        if (gameRunning && !gamePaused) {
            clearInterval(gameLoop);
            gameLoop = setInterval(gameStep, dropSpeed);
        }
        
        updateScore();
    }
}

function hardDrop() {
    while (movePiece(0, 1)) {
        score += 2;
    }
    updateScore();
    drawBoard();
}

function updateScore() {
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
    document.getElementById('lines').textContent = lines;
}

function gameOver() {
    clearInterval(gameLoop);
    gameRunning = false;
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOver').classList.remove('hidden');
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    
    console.log(`Game Over - Score: ${score}, Lines: ${lines}, Level: ${level}`);
    
}

// Drawing Functions
function drawBoard() {
    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw board
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            if (board[y][x]) {
                drawBlock(ctx, x, y, COLORS[board[y][x]]);
            }
        }
    }
    
    // Draw current piece
    if (currentPiece) {
        for (let y = 0; y < currentPiece.shape.length; y++) {
            for (let x = 0; x < currentPiece.shape[y].length; x++) {
                if (currentPiece.shape[y][x]) {
                    drawBlock(ctx, currentPiece.x + x, currentPiece.y + y, COLORS[currentPiece.color]);
                }
            }
        }
    }
}

function drawNextPiece() {
    nextCtx.fillStyle = '#1a1a2e';
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    
    if (nextPiece) {
        const offsetX = (nextCanvas.width - nextPiece.shape[0].length * BLOCK_SIZE) / 2;
        const offsetY = (nextCanvas.height - nextPiece.shape.length * BLOCK_SIZE) / 2;
        
        for (let y = 0; y < nextPiece.shape.length; y++) {
            for (let x = 0; x < nextPiece.shape[y].length; x++) {
                if (nextPiece.shape[y][x]) {
                    const drawX = offsetX / BLOCK_SIZE + x;
                    const drawY = offsetY / BLOCK_SIZE + y;
                    drawBlock(nextCtx, drawX, drawY, COLORS[nextPiece.color]);
                }
            }
        }
    }
}

function drawBlock(context, x, y, color) {
    const px = x * BLOCK_SIZE;
    const py = y * BLOCK_SIZE;
    
    // Main block
    context.fillStyle = color;
    context.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
    
    // Highlight
    context.fillStyle = 'rgba(255, 255, 255, 0.3)';
    context.fillRect(px, py, BLOCK_SIZE, 2);
    context.fillRect(px, py, 2, BLOCK_SIZE);
    
    // Shadow
    context.fillStyle = 'rgba(0, 0, 0, 0.3)';
    context.fillRect(px, py + BLOCK_SIZE - 2, BLOCK_SIZE, 2);
    context.fillRect(px + BLOCK_SIZE - 2, py, 2, BLOCK_SIZE);
    
    // Border
    context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    context.lineWidth = 1;
    context.strokeRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
}

// Keyboard Controls
function handleKeyPress(e) {
    if (!gameRunning || gamePaused) {
        if (e.key === 'p' || e.key === 'P') {
            togglePause();
        }
        return;
    }
    
    switch(e.key) {
        case 'ArrowLeft':
            movePiece(-1, 0);
            drawBoard();
            break;
        case 'ArrowRight':
            movePiece(1, 0);
            drawBoard();
            break;
        case 'ArrowDown':
            if (movePiece(0, 1)) {
                score += 1;
                updateScore();
            }
            drawBoard();
            break;
        case 'ArrowUp':
            rotatePiece();
            break;
        case ' ':
            e.preventDefault();
            hardDrop();
            break;
        case 'p':
        case 'P':
            togglePause();
            break;
    }
}

// Initialize game when page loads
window.addEventListener('load', init);

// Made with Bob
