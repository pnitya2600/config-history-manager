import { useEffect, useState } from "react";
import { getVersions } from "../api/configApi";

export default function VersionHistory({ onCompare }) {
  const [versions, setVersions] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    getVersions().then(res => setVersions(res.data));
  }, []);

  const handleCompare = () => {
    if (from && to && from !== to) {
      onCompare(from, to);
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Version History</h2>

      <select onChange={e => setFrom(e.target.value)}>
        <option value="">Select From</option>
        {versions.map(v => (
          <option key={v.versionId} value={v.versionId}>
            {v.versionId} – {v.comment}
          </option>
        ))}
      </select>

      &nbsp;&nbsp;

      <select onChange={e => setTo(e.target.value)}>
        <option value="">Select To</option>
        {versions.map(v => (
          <option key={v.versionId} value={v.versionId}>
            {v.versionId} – {v.comment}
          </option>
        ))}
      </select>

      &nbsp;&nbsp;

      <button onClick={handleCompare}>Compare</button>
    </div>
  );
}
