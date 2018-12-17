window.Game2048 = function () {
  this.cells = [];
  this.boardValues = [
    [0, 0, 0, 0],
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 2, 0, 0]];

  this.board = [[{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}, {}]];

  this.refreshBoard = () => {
    this.cells.forEach(cell => this.updateBoardCell(cell.x, cell.y));

    this.refreshScore();
  };

  this.score = 0;

  this.collapseUp = (oldBoard) => {
    let b = this.duplicateBoardValues(oldBoard);

    for (let x = 0; x < 4; x++) {
      // Collapse all 0s UP
      let vs = [];

      for (let y = 0; y < 4; y++) if (b[x][y] !== 0) vs.push(b[x][y]);
      for (let y = 0; y < 4; y++) b[x][y] = vs[y] || 0;

      // Merge all duplicate values UP
      for (let y = 0; y < 3; y++) {
        if (b[x][y] === b[x][y + 1]) {
          this.score += b[x][y + 1];
          b[x][y + 1] *= 2;

          for (let y2 = y; y2 < 3; y2++) b[x][y2] = b[x][y2 + 1];

          b[x][3] = 0;
        }
      }
    }

    return b;
  };

  this.collapseDown = oldBoard => {
    let b = this.duplicateBoardValues(oldBoard);

    for (let x = 0; x < 4; x++) {
      // Collapse all 0s DOWN
      let vs = [];

      for (let y = 3; y >= 0; y--) if (b[x][y] !== 0) vs.push(b[x][y]);
      for (let y = 0; y < 4; y++) b[x][y] = vs[3 - y] || 0;

      // Merge all duplicate values DOWN
      for (let y = 3; y > 0; y--) {
        if (b[x][y] === b[x][y - 1]) {
          this.score += b[x][y - 1];
          b[x][y - 1] *= 2;

          for (let y2 = y; y2 > 0; y2--) b[x][y2] = b[x][y2 - 1];

          b[x][0] = 0;
        }
      }
    }

    return b;
  };

  this.newRandomCell = () => {
    let unoccupied = this.cells.filter(c => this.boardValues[c.x][c.y] === 0);

    if (unoccupied.length) {
      let i = Math.floor(Math.random() * unoccupied.length);
      let v = [1, 2, 4][Math.floor(Math.random() * 3)];
      let cell = unoccupied[i];

      this.boardValues[cell.x][cell.y] = v;
      this.updateBoardCell(cell.x, cell.y);

      cell.domCell.classList.add('new');
    } else {
      this.gameOver();
    }
  };

  this.updateBoardCell = (x, y) => {
    const cell = this.board[x][y];
    const domCell = cell.domCell;
    const v = this.boardValues[x][y];
    if (v) domCell.classList.add('filled');
    else domCell.classList.remove('filled');

    domCell.classList.remove('new');
    domCell.innerHTML = `<span>${v}</span>`;
  };

  this.events = {
    ArrowLeft: () => {
      this.boardValues = this.collapseLeft(this.boardValues);
      this.refreshBoard();
      this.newRandomCell();
    },
    ArrowRight: () => {
      this.boardValues = this.collapseRight(this.boardValues);
      this.refreshBoard();
      this.newRandomCell();
    },
    ArrowUp: () => {
      this.boardValues = this.collapseUp(this.boardValues);
      this.refreshBoard();
      this.newRandomCell();
    },
    ArrowDown: () => {
      this.boardValues = this.collapseDown(this.boardValues);
      this.refreshBoard();
      this.newRandomCell();
    },
  };

  this.addKeyboardSupport = () => {
    document.addEventListener('keyup', event => this.events[event.key]());
  };

  this.newGame = (elementId) => {
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
};
