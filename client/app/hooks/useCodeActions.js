import { useState } from "react";

export const useCodeActions = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const callApi = async (endpoint, code) => {
    if (!code) return;
    setLoading(true);
    setOutput("");
    setError("");

    try {
      const res = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setOutput(data[endpoint === "explain" ? "explanation" :
                    endpoint === "optimize" ? "optimized" :
                    endpoint === "bug" ? "bugs" : "flowchart"] || "No result returned.");
    } catch (err) {
      console.error(err);
      setOutput(`Error with ${endpoint}.`);
    }

    setLoading(false);
  };

  return { output, loading, error, callApi };
};
