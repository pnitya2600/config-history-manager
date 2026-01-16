const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const configRoutes = require("./routes/configRoutes");
const initialConfig = require("./data/initialConfig");
const store = require("./data/store");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ FORCE seed on startup
if (store.getRawVersions().length === 0) {
  store.addVersion({
    versionId: uuidv4(),
    timestamp: new Date().toISOString(),
    config: initialConfig,
    diffFromPrevious: null,
    comment: "Initial configuration"
  });

  console.log("✅ Initial config seeded");
}

app.use(configRoutes);


const PORT = 5050;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
