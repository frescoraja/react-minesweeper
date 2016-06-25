var Tile = function (board, pos) {
  this.board = board;
  this.pos = pos;
  this.bombed = false;
  this.explored = false;
  this.flagged = false;
}

Tile.DELTAS = [[-1, -1], [-1,  0], [-1,  1], [ 0, -1], 
               [ 0,  1], [ 1, -1], [ 1,  0], [ 1,  1]]

Tile.prototype.adjacentBombCount = function() {
  var bombCount = 0;
  this.neighbors().forEach(function(neighbor) {
    if (neighbor.bombed) {
      bombCount++;
    }
  });
  return bombCount;
};

Tile.prototype.explore = function () {
  if (this.flagged || this.explored) { 
    return this;
  }

  this.explored = true;
  if (!this.bombed && this.adjacentBombCount() === 0) {
    this.neighbors().forEach(function(tile) {
      tile.explore();
    });
  }

};

Tile.prototype.neighbors = function() {
  var adjacentCoords = [];
  Tile.DELTAS.forEach(function(delta) {
    var newPos = [delta[0] + this.pos[0], delta[1] + this.pos[1]];
    if (this.board.onBoard(newPos)) {
      adjacentCoords.push(newPos);
    }
  }.bind(this));

  return adjacentCoords.map(function(coord) {
    return this.board.grid[coord[0]][coord[1]]
  }.bind(this));
};

Tile.prototype.plantBomb = function () {
  this.bombed = true;
};

Tile.prototype.toggleFlag = function () { 
  if (!this.explored) {
    this.flagged = !this.flagged;
    return true;
  }

  return false;
};

var Board = function (gridSize, numBombs) {
  this.gridSize = gridSize;
  this.grid = [];
  this.numBombs = numBombs;
  this.bombs = [];
  this.generateBoard();
  this.plantBombs();
};

Board.prototype.generateBoard = function () {
  for (var i = 0; i < this.gridSize; i++) {
    this.grid.push([]);
    for (var j = 0; j < this.gridSize; j++) {
      var tile = new Tile(this, [i, j]);
      this.grid[i].push(tile);
    }
  }
};

Board.prototype.onBoard = function (pos) {
  return (
    pos[0] >= 0 && pos[0] < this.gridSize && 
      pos[1] >= 0 && pos[1] < this.gridSize
  )
}

Board.prototype.plantBombs = function () {
  var totalPlantedBombs = 0;
  while (totalPlantedBombs < this.numBombs) {
    var row = Math.floor(Math.random() * (this.gridSize - 1));
    var col = Math.floor(Math.random() * (this.gridSize - 1));

    var tile = this.grid[row][col];
    if (!tile.bombed) {
      tile.plantBomb();
      this.bombs.push(tile);
      totalPlantedBombs++;
    }
  }
};

Board.prototype.lost = function () {
  var lost = false;
  this.grid.forEach(function(row) {
    row.forEach(function(tile) {
      if (tile.bombed && tile.explored) {
        lost = true;
      }
    });
  });
  
  if (lost) {
    this.bombs.forEach( (tile) => {
      tile.explore();
    })
  }
  return lost;
};

Board.prototype.won = function () {
  let won = true;
  let unexplored = 0;
  this.grid.forEach(function(row) {
    row.forEach(function(tile) {
      if (!tile.explored) unexplored++;
      if (tile.flagged !== tile.bombed) {
        won = false;
      }
    });
  });
  console.log("unexplored: " + unexplored + "\nnumBombs: " + this.numBombs);
  return (won && unexplored === 0) || (unexplored === this.numBombs && !this.lost());
};

module.exports = {
  Board: Board,
  Tile: Tile
};
