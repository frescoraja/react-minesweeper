import React from 'react';
import ScoreStore from '../stores/score_store';

const Timer = React.createClass({
  getInitialState: function() {
    return { time: 0 };
  },

  componentDidMount: function () {
    ScoreStore.addChangeHandler(this.restartTimer);
    this.timer = setInterval(this.tick, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.timer);
  },

  restartTimer: function() {
    this.setState({ time: 0 });
  },

  render: function() {
    return (
      <div className="timer">
        <h1 className="time">Time: {this.state.time}</h1>  
      </div>
    );
  },

  tick: function() {
    if (this.props.playing) {
      this.setState({ time: this.state.time + 1 });
    }
  }
});

export default Timer;
