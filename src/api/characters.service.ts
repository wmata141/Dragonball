import api from "./axios";
import type { CharacterDetail } from "../types/character";

interface CharactersParams {
  page?: number;
  name?: string;
  race?: string;
  sort?: string;
  pageSize?: number;
}

export const getCharacters = async (params: CharactersParams) => {
  const response = await api.get("/characters", {
    params,
  });
  return response.data;
};

export const getCharacterById = async (id: number) => {
  const response = await api.get(`/characters/${id}`);
  return response.data;
};

export const createCharacter = async (character: Partial<CharacterDetail>) => {
  const response = await api.post("/characters", character);
  return response.data;
};

export const updateCharacter = async (id: number, character: Partial<CharacterDetail>) => {
  const response = await api.put(`/characters/${id}`, character);
  return response.data;
};

export const deleteCharacter = async (id: number) => {
  const response = await api.delete(`/characters/${id}`);
  return response.data;
};
