import { Game } from './models/Game';

/**
 * Creates new [[Game]] instance with default values for properties `name`, `image` and `id`.
 * Properties `categories` and `jackpot` can be configured by params.
 * @param categories Array of category IDs.
 * @param jackpot Jackpot amount (optional).
 * @returns [[Game]] instance.
 */
export const getGame = (categories: string[], jackpot?: number): Game => {
  return  {
    categories,
    jackpot,
    name: 'The Wish Master',
    image: '//stage.whgstage.com/scontent/images/games/NETHEWISHMASTER.jpg',
    id: 'NETHEWISHMASTER'
  };
};
