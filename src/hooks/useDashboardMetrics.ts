import { useEffect, useState } from "react";

type Metrics = {
  characters: number;
  planets: number;
};

export const useDashboardMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);

        const [charactersRes, planetsRes] = await Promise.all([
          fetch("https://dragonball-api.com/api/characters"),
          fetch("https://dragonball-api.com/api/planets"),
        ]);

        if (!charactersRes.ok || !planetsRes.ok) {
          throw new Error("Error al cargar métricas");
        }

        const charactersData = await charactersRes.json();
        const planetsData = await planetsRes.json();

        setMetrics({
          characters: charactersData.meta?.totalItems ?? 0,
          planets: planetsData.meta?.totalItems ?? 0,
        });

      } catch {
        setError("No se pudieron cargar las métricas");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return { metrics, loading, error };
};
