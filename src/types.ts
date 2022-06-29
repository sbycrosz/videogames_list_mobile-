export type Game = {
  id: number;
  name: string;
  backgroundImage: string;
  released: string;
  metacritic: number | null;
};

export type GameInformation = {
  name: string;
  backgroundImage: string;
  description: string;
  platforms: { platform: { name: string } }[];
  genres: { name: string }[];
  released: string;
  developers: { name: string }[];
  publishers: { name: string }[];
};
