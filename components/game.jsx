import React from 'react';
import Minesweeper from '../minesweeper';
import Board from './board';

const Game = React.createClass({
  getInitialState: function() {
    const board = new Minesweeper.Board(9, 10);
    return { board: board };
  },

  render: function() {
    let modal;
    if (this.state.board.lost() || this.state.board.won()) {
      const text = this.state.board.won() ? "You win!" : "You lost!";
      modal = 
        <div className="modal-screen">
          <div className="modal-content">
            <p>{text}</p>
            <button onClick={this.restartGame}>Play Again</button>
          </div>
        </div>
    }

    return (
      <div>
        {modal}
        <Board
          board={this.state.board}
          updateGame={this.updateGame} />
      </div>
    );  
  },

  restartGame: function() {
    const board = new Minesweeper.Board(9, 10);
    this.setState({ board: board });
  },

  updateGame: function(tile, flagged) {
    if (flagged) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }

    this.setState({ board: this.state.board }); 
  }
});

export default Game;
