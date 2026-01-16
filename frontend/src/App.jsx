import { useState } from "react";
import ConfigEditor from "./components/ConfigEditor";
import VersionHistory from "./components/VersionHistory";
import DiffViewer from "./components/DiffViewer";

function App() {
  const [compare, setCompare] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Config History Manager</h1>

      <ConfigEditor />

      <VersionHistory
        onCompare={(from, to) => setCompare({ from, to })}
      />

      {compare && (
        <DiffViewer from={compare.from} to={compare.to} />
      )}
    </div>
  );
}

export default App;
