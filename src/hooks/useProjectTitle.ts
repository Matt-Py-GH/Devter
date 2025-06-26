import { useState, useEffect } from "react";

export function useProjectTitle() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTitle() {
      try {
        const res = await fetch("/api/user/metadata");
        if (!res.ok) throw new Error("Error al cargar título");
        const data = await res.json();
        setTitle(data.projectTitle || "");
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTitle();
  }, []);

  async function updateTitle(newTitle: string) {
    setTitle(newTitle);
    try {
      const res = await fetch("/api/user/metadata", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectTitle: newTitle }),
      });
      if (!res.ok) throw new Error("Error al guardar título");
    } catch (e: any) {
      setError(e.message);
    }
  }

  return { title, setTitle: updateTitle, loading, error };
}
