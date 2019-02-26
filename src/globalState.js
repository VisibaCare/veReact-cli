let globalState = {
  input: null,
  output: null,
  name: null,
  port: null,
  dir: null,
  publicPath: null,
};

function setGlobalState(newState) {
  globalState = newState;
}

function getGlobalState() {
  return globalState;
}

module.exports = {
  setGlobalState,
  getGlobalState,
}
