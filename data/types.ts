export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface Game {
  id: string;
  title: string;
  platform: string;
  year: string;
  image: string;
  rom: string;
  core?: string; // Optional, can be auto-detected
}
