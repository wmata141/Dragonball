export interface Character {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  affiliation: string;
  image: string;
}

export interface Transformation {
  id: number;
  name: string;
  image: string;
  ki: string;
}

export interface Planet {
  id: number;
  name: string;
  image: string;
}

export interface CharacterDetail {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  affiliation: string;
  description: string;
  image: string;
  originPlanet: Planet;
  transformations: Transformation[];
}
