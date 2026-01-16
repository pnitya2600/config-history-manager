const jsondiffpatch = require("jsondiffpatch").create({
  arrays: {
    detectMove: false,
    includeValueOnMove: false
  }
});

function computeDiff(oldConfig, newConfig) {
  return jsondiffpatch.diff(oldConfig, newConfig);
}

function isEmptyDiff(diff) {
  return !diff || Object.keys(diff).length === 0;
}

module.exports = {
  computeDiff,
  isEmptyDiff
};
