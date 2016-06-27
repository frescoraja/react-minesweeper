import React from 'react';

const Timer = React.createClass({
  getInitialState: function() {
    return { time: 0 };
  },

  componentDidMount: function () {
    this.timer = setInterval(this.tick, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.timer);
  },

  render: function() {
    return (
      <div className="timer">
        <h1 className="time">Time: {this.state.time}</h1>  
      </div>
    );
  },

  tick: function() {
    const playing = this.props.boardState;
    if (playing) {
      this.setState({ time: this.state.time + 1 }); 
    }
  }
});

export default Timer;
