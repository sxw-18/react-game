export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface Game {
  id: string;
  title: string;
  description?: string; // New field for game description
  platform: string;
  genre: string;
  year: string;
  image: string;
  rom: string;
  core?: string; // Optional, can be auto-detected
}
