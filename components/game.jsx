import React from 'react';
import Minesweeper from '../minesweeper';
import Board from './board';
import Timer from './timer';
import ScoreBoard from './scoreboard';
import ScoreStore from '../stores/score_store';

const Game = React.createClass({
  getInitialState: function() {
    const board = new Minesweeper.Board(9, 10);
    return { board: board, playing: false };
  },

  render: function() {
    let modal;
    if (this.state.board.gameOver()) {
      const text = this.state.board.won() ? `You win!` : `You lost!`;
      modal =
        (<div className="modal-screen">
         <div className="modal-content">
         <p>{text}</p>
         <button onClick={this.restartGame}>Play Again</button>
         </div>
         </div>);
    }
    console.log("rendered board");
    window.board = this.state.board;
    return (
      <div>
        {modal}
        <Board
          board={this.state.board}
          updateGame={this.updateGame} />
        <Timer ref="timer" board={this.state.board} playing={this.state.playing} />
        <ScoreBoard />
      </div>
    );  
  },

  restartGame: function() {
    this.setState({ board: new Minesweeper.Board(9, 10), playing: false });
  },

  updateGame: function(tile, flagged) {
    if (flagged) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }
    if (this.state.board.gameOver()) {
      const score = { score: this.refs.timer.state.time, won: this.state.board.won() };
      console.log(score);
      ScoreStore.addScore(score);
      this.setState({ board: this.state.board, playing: false });
    } else {
      this.setState({ board: this.state.board, playing: true }); 
    }
  }
});

export default Game;
