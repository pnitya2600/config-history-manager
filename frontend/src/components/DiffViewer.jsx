import { useEffect, useRef } from "react";
import { getDiff } from "../api/configApi";
import * as jsondiffpatch from "jsondiffpatch";

export default function DiffViewer({ from, to }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!from || !to) return;

    getDiff(from, to).then(res => {
      const delta = res.data;

      if (!delta) {
        containerRef.current.innerHTML = "<p>No differences</p>";
        return;
      }

      const html = jsondiffpatch.formatters.html.format(delta);
      containerRef.current.innerHTML = html;
    });
  }, [from, to]);

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>
        Diff: <code>{from}</code> → <code>{to}</code>
      </h2>
      <div ref={containerRef} />
    </div>
  );
}
