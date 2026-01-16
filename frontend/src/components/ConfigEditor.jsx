import { useEffect, useState } from "react";
import { getConfig, saveConfig } from "../api/configApi";

export default function ConfigEditor() {
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getConfig().then(res => {
      setJsonText(JSON.stringify(res.data, null, 2));
    });
  }, []);

  const handleSave = async () => {
    try {
      setError("");
      setMessage("");

      const parsed = JSON.parse(jsonText);
      await saveConfig(parsed);

      setMessage("✅ Configuration saved successfully");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid JSON format");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Configuration Editor</h2>

      <textarea
        rows={25}
        cols={90}
        value={jsonText}
        onChange={e => setJsonText(e.target.value)}
        style={{ fontFamily: "monospace" }}
      />

      <br /><br />

      <button onClick={handleSave}>Save Config</button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
