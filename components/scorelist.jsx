import React from 'react';

const ScoreList = React.createClass({
  renderScores: function() {
    const scores = this.prop.scores;
    return (
      scores.map((score, idx) => {
        return (
          <tr><td key={idx}>{score}</td></tr>
        );
      })
    );
  },

  render: function() {
    return (
      <table className="scorelist">
      <tbody>
        <tr><th>Scores:</th></tr>
          {this.renderScores}
          </tbody>
      </table>
    );
  }
});

export default ScoreList;
