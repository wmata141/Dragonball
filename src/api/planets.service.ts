import api from "./axios";

export interface Planet {
  id: number;
  name: string;
  description: string;
  image: string;
  inhabitants?: string[];
}

export const getPlanets = async (page = 1, name?: string) => {
  const response = await api.get("/planets", {
    params: {
      page,
      name,
    },
  });
  return response.data;
};

export const getPlanetById = async (id: number) => {
  const response = await api.get(`/planets/${id}`);
  return response.data;
};
