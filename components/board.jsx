import React from 'react';
import Tile from './tile';

const Board = React.createClass({
  renderRows: function() {
    const board = this.props.board;
    return board.grid.map((row, i) => {
      return (
        <div className="row" key={`row-${i}`}>
          {this.renderTiles(row, i)}    
        </div>
      );
    });
  },

  renderTiles: function(row, i) {
    const board = this.props.board;
    return row.map((tile, j) => {
      return (
        <Tile
          tile={tile}
          updateGame={this.props.updateGame}
          key={i * board.gridSize + j} />
      );
    });
  },

  render: function() {
    return (
      <div id="board">
         {this.renderRows()}
      </div>
    );
  }
});

export default Board;
