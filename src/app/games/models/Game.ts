/**
 * Game model comes from the server.
 */
export interface Game {
  /** The ID of the game. */
  id: string;

  /** URL to the game picture. */
  image: string;

  /** The name of the game. */
  name: string;

  /** Array of category IDs. */
  categories: string[];

  /** Jackpot amount. */
  jackpot?: number;
}
