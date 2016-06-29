let _scores = [],
    _callbacks = [];

const ScoreStore = {
  all() {
    return _scores.slice();
  },

  addChangeHandler(callback) {
    _callbacks.push(callback);
  },

  removeChangeHandler(callback) {
    _callbacks.splice(_callbacks.indexOf(callback), 1);
  },

  changed() {
    for (let i = 0; i < _callbacks.length; i++) {
      _callbacks[i]();
    }
  },

  addScore(score) {
    _scores = _scores.concat([score]);
    this.changed();
  }
};

export default ScoreStore;
