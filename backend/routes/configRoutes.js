const express = require("express");
const { v4: uuidv4 } = require("uuid");
const {
  getLatestVersion,
  addVersion,
  getAllVersions,
  getVersionById
} = require("../data/store");
const { computeDiff, isEmptyDiff } = require("../utils/diff");

const router = express.Router();

/**
 * GET /config
 * Returns latest config
 */
router.get("/config", (req, res) => {
  const latest = getLatestVersion();
  res.json(latest ? latest.config : {});
});

/**
 * POST /config/save
 * Save new version
 */
router.post("/config/save", (req, res) => {
  const newConfig = req.body;
  const previous = getLatestVersion();

  const oldConfig = previous ? previous.config : {};
  const diff = computeDiff(oldConfig, newConfig);

  // BONUS: prevent stale saves
  if (isEmptyDiff(diff)) {
    return res.status(400).json({
      message: "No changes detected. Save aborted."
    });
  }

  const version = {
    versionId: uuidv4(),
    timestamp: new Date().toISOString(),
    config: newConfig,
    diffFromPrevious: diff,
    comment: req.body.comment || "Config updated"
  };

  addVersion(version);

  res.status(201).json({
    message: "Version saved successfully",
    versionId: version.versionId
  });
});

/**
 * GET /config/versions
 */
router.get("/config/versions", (req, res) => {
  res.json(getAllVersions());
});

/**
 * GET /config/versions/:id
 */
router.get("/config/versions/:id", (req, res) => {
  const version = getVersionById(req.params.id);
  if (!version) {
    return res.status(404).json({ message: "Version not found" });
  }
  res.json(version);
});

/**
 * GET /config/diff?from=v1&to=v2
 */
router.get("/config/diff", (req, res) => {
  const { from, to } = req.query;

  const v1 = getVersionById(from);
  const v2 = getVersionById(to);

  if (!v1 || !v2) {
    return res.status(404).json({ message: "Invalid version ids" });
  }

  const diff = computeDiff(v1.config, v2.config);
  res.json(diff);
});

module.exports = router;
