import React from 'react';

const Tile = React.createClass({
  handleClick: function(e) {
    const flagged = e.altKey ? true : false;
    this.props.updateGame(this.props.tile, flagged);
  },

  render: function() {
    const tile = this.props.tile;
    let klass, symbol, count;
    if (tile.explored) {
      if (tile.bombed) {
        klass = 'bombed';
        symbol = '\u2622';
      } else {
        klass = 'explored';
        count = tile.adjacentBombCount();
        symbol = (count > 0 ? `${count}` : "");
      }
    } else if (tile.flagged) {
      klass = 'flagged';
      symbol = '\u2691';
    } else {
      klass = 'unexplored';
    }
    klass = `tile ${klass}`;

    return (
      <div
        className={klass}
        onClick={this.handleClick}>
        {symbol}
      </div>
    );
  }
});

export default Tile;
