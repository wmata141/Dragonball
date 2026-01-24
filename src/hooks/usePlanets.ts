import { useEffect, useState } from "react";
import { getPlanets } from "../api/planets.service";
import type { Planet } from "../api/planets.service";


export const usePlanets = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterName, setFilterName] = useState("");

  const fetchPlanets = async () => {
    try {
      setLoading(true);
      const data = await getPlanets(page, filterName);
      const items = Array.isArray(data) ? data : data.items;
      const total = Array.isArray(data) ? 1 : data.meta?.totalPages || 1;
      setPlanets(items);
      setTotalPages(total);
    } catch (err) {
      setError("Error al cargar planetas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, [page, filterName]);

  return {
    planets,
    loading,
    error,
    page,
    totalPages,
    setPage,
    filterName,
    setFilterName,
    fetchPlanets,
  };
};

