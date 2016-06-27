import React from 'react';
import Timer from './timer';
import ScoreList from './scorelist';

const ScoreBoard = React.createClass({
  getInitialState: function() {
    return { scores: [] };
  },

  render: function() {
    return (
      <div className="scoreboard">
        <ScoreList
          scores={this.state.scores}
          updateScore={this.updateScore} />
      </div>
    );
  },

  updateScores: function(score) {
    const scores = this.state.scores;
    this.setState({ scores: scores.concat([score]) });
  }
});

export default ScoreBoard;
