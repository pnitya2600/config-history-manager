const versions = [];

function addVersion(version) {
  versions.push(version);
}

function getLatestVersion() {
  return versions.length ? versions[versions.length - 1] : null;
}

function getAllVersions() {
  return versions.map(v => ({
    versionId: v.versionId,
    timestamp: v.timestamp,
    comment: v.comment
  }));
}

function getVersionById(id) {
  return versions.find(v => v.versionId === id);
}

function getRawVersions() {
  return versions;
}

module.exports = {
  addVersion,
  getLatestVersion,
  getAllVersions,
  getVersionById,
  getRawVersions
};
