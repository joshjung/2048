const Game2048 = function () {
  this.cells = [];

  this.score = 0;

  this.boardValues = [
    [0, 0, 0, 0],
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 2, 0, 0]];

  this.board = [[{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}]];

  this.events = {
    ArrowLeft: () => {
      let { board, score } = this.swipeLeft(this.boardValues, this.score);
      this.boardValues = board;
      this.score = score;

      this.refreshBoard();
      this.newRandomCell();
    },
    ArrowRight: () => {
      let { board, score } = this.swipeRight(this.boardValues, this.score);
      this.boardValues = board;
      this.score = score;

      this.refreshBoard();
      this.newRandomCell();
    },
    ArrowUp: () => {
      let { board, score } = this.swipeUp(this.boardValues, this.score);
      this.boardValues = board;
      this.score = score;

      this.refreshBoard();
      this.newRandomCell();
    },
    ArrowDown: () => {
      let { board, score } = this.swipeDown(this.boardValues, this.score);
      this.boardValues = board;
      this.score = score;

      this.refreshBoard();
      this.newRandomCell();
    },
  };
};

Game2048.prototype = function () {};
Game2048.prototype.addKeyboardSupport = function() {
  document.addEventListener('keyup', event => this.events[event.key] && this.events[event.key]());
};

Game2048.prototype.newGame = function(elementId) {
  const domBoard = document.getElementById(elementId);
  let domColumn;

  this.board.forEach((col, x) => {
    domBoard.appendChild(domColumn = document.createElement('div'));
    domColumn.classList.add('column');

    col.forEach((cell, y) => {
      let domCell = this.board[x][y].domCell = document.createElement('div');
      domColumn.appendChild(domCell);
      domCell.classList.add('cell');
      domCell.cell = cell;
      domCell.x = cell.x = x;
      domCell.y = cell.y = y;

      cell.domCell = domCell;
      this.cells.push(cell);

      this.updateBoardCell(x, y);
    });
  });
};

Game2048.prototype.refreshBoard = function() {
  this.cells.forEach(cell => this.updateBoardCell(cell.x, cell.y));

  this.refreshScore();
};

Game2048.prototype.duplicateBoardValues = function(boardValues) {
  return boardValues.map(col => [...col]);
};

Game2048.prototype.collapseRow = function(row, score) {
  let x = -1;
  while (row[++x]) {
    if (row[x+1] === row[x]) {
      score += row[x];
      row.splice(x, 2, row[x] * 2);
    }
  }
  return score;
};

Game2048.prototype.swipeLeft = function(board, score) {
  board = this.duplicateBoardValues(board);

  for (let y = 0; y < 4; y++) {
    let row = [];
    for (let x = 0; x < 4; x++) if (board[x][y]) row.push(board[x][y]);
    score = this.collapseRow(row, score);

    for (let x = 0; x < 4; x++) board[x][y] = row[x] || 0;
  }

  return { board, score };
};

Game2048.prototype.swipeRight = function(board, score) {
  board = this.duplicateBoardValues(board);

  for (let y = 0; y < 4; y++) {
    let row = [];
    for (let x = 3; x >= 0; x--) if (board[x][y]) row.push(board[x][y]);
    score = this.collapseRow(row, score);
    for (let x = 0; x < 4; x++) board[x][y] = row[3 - x] || 0;
  }

  return { board, score };
};

Game2048.prototype.swipeUp = function(board, score) {
  // noop

  console.log('TODO: you need to implement swipeUp!');

  return { board, score }
};

Game2048.prototype.swipeDown = function(board, score) {
  // noop

  console.log('TODO: you need to implement swipeDown!');

  return { board, score }
};

Game2048.prototype.newRandomCell = function() {
  let unoccupied = this.cells.filter(c => this.boardValues[c.x][c.y] === 0);

  if (unoccupied.length) {
    let i = Math.floor(Math.random() * unoccupied.length);
    let v = [2, 4][Math.floor(Math.random() * 2)];
    let cell = unoccupied[i];

    this.boardValues[cell.x][cell.y] = v;
    this.updateBoardCell(cell.x, cell.y);

    cell.domCell.classList.add('new');
  } else {
    this.gameOver();
  }
};

Game2048.prototype.updateBoardCell = function(x, y) {
  const cell = this.board[x][y];
  const domCell = cell.domCell;
  const v = this.boardValues[x][y];
  if (v) domCell.classList.add('filled');
  else domCell.classList.remove('filled');

  domCell.classList.remove('new');
  domCell.innerHTML = `<span>${v}</span>`;
};

Game2048.prototype.refreshScore = function() {
  // noop

  console.log('TODO: you need to implement refreshScore!');
};

Game2048.prototype.gameOver = function() {
  // noop

  console.log('TODO: you need to implement gameOver!');
};

window.Game2048 = Game2048;
