import { useEffect, useState } from "react";
import { getCharacterById } from "../api/characters.service";
import type { CharacterDetail } from "../types/character";

export const useCharacterDetail = (id: number) => {
  const [character, setCharacter] = useState<CharacterDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const data = await getCharacterById(id);
        setCharacter(data);
      } catch (err) {
        setError("Error al cargar el personaje");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  return { character, loading, error };
};
