import React from 'react';
import ScoreStore from '../stores/score_store';

const ScoreBoard = React.createClass({
  getInitialState: function() {
    return { scores: ScoreStore.all() };
  },

  componentDidMount: function() {
    ScoreStore.addChangeHandler(this.handleNewScore);
  },

  handleNewScore: function() {
    this.setState({ scores: ScoreStore.all() });
  },

  renderScores: function() {
    const scores = this.state.scores;
    return (
      scores.map((score, idx) => {
        const classname = (score.won ? "won" : "lost");
        return (
          <tr><td key={idx} className={classname}>{score.score}</td></tr>
        );
      })
    );
  },

  render: function() {
    return (
      <table className="scorelist">
      <tbody>
        <tr><th>Scores:</th></tr>
          {
            this.state.scores.map((score, idx) => {
              const classname = (score.won ? "won" : "lost" );
              return (
                <tr key={idx}><td className={classname}>{score.score}</td></tr>
              );
            })
          }
          </tbody>
      </table>
    );
  }
});

export default ScoreBoard;
