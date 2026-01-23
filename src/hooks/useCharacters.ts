import { useEffect, useState } from "react";
import { getCharacters } from "../api/characters.service";
import { useDebounce } from "./useDebounce";
import type { Character } from "../types/character";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [sort, setSort] = useState("");
  const debouncedName = useDebounce(name, 500);

  const PAGE_SIZE = 10;

  // const normalizeKi = (ki: string) => {
  //   if (!ki) return 0;
  //   return Number(ki.replace(/[.,]/g, ""));
  // };

  const fetchCharacters = async () => {
    try {
      setLoading(true);

      // Siempre pedimos solo la página actual
      const data = await getCharacters({
        page,
        pageSize: PAGE_SIZE,
        name: debouncedName || undefined,
        race: race || undefined,
        sort: sort || undefined, // Si la API soporta sort, úsalo
      });

      const items = Array.isArray(data) ? data : data.items;
      const total = Array.isArray(data) ? 1 : data.meta.totalPages;

      setCharacters(items);
      setTotalPages(total);

    } catch (err) {
      console.error(err);
      setError("Error al cargar personajes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [page, debouncedName, race, sort]);

  return {
    characters,
    loading,
    error,
    page,
    totalPages,
    setPage,
    name,
    setName,
    race,
    setRace,
    sort,
    setSort,
    fetchCharacters,
  };
};
