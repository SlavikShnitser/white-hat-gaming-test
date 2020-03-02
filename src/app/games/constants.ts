import { RibbonConfig } from './models/RibbonConfig';
import { ToolbarItem } from './models/ToolbarItem';

/** The path to the API endpoints. */
export const API_PATH = 'http://stage.whgstage.com/front-end-test';

/** Defines how often jackpot related information should be refreshed. */
export const FETCH_JACKPOT_INTERVAL = 2000;

/** All categories IDs. */
export const CATEGORIES = {
  TOP: 'top',
  NEW: 'new',
  SLOTS: 'slots',
  CLASSIC: 'classic',
  POKER: 'poker',
  ROULETTE: 'roulette',
  BLACKJACK: 'blackjack',
  BALL: 'ball',
  FUN: 'fun',
  VIRTUAL: 'virtual',
};

/** Toolbar labels that not related to categories.. */
export const JACKPOT = 'jackpot';
export const LIVE = 'live';
export const TABLE = 'table';
export const OTHER = 'other';

/** An array of toolbar items. */
export const TOOLBAR_ITEMS: ToolbarItem[] = [
  { label: 'Top Games', path: CATEGORIES.TOP },
  { label: 'New Games', path: CATEGORIES.NEW },
  { label: 'Slots', path: CATEGORIES.SLOTS },
  { label: 'Jackpots', path: JACKPOT },
  { label: 'Live', path: LIVE },                            // <-- ask about this item
  { label: 'Blackjack', path: CATEGORIES.BLACKJACK },
  { label: 'Roulette', path: CATEGORIES.ROULETTE },
  { label: 'Table', path: TABLE },                          // <-- ask about this item
  { label: 'Poker', path: CATEGORIES.POKER },
  { label: 'Other', path: OTHER },
];

/** Ribbon config for games with category "NEW". */
export const NEW_RIBBON_CONFIG: RibbonConfig = {
  className: 'new',
  image: 'assets/ribbon-green.svg',
  label: 'NEW'
};

/** Ribbon config for games with category "TOP". */
export const TOP_RIBBON_CONFIG: RibbonConfig = {
  className: 'top',
  image: 'assets/ribbon-grey.svg',
  label: 'TOP'
};
