import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, interval, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/internal/operators';

import { GamesService } from '../games.service';
import { Game } from '../models/Game';
import { JackpotInfo } from '../models/JackpotInfo';
import { ToolbarItem } from '../models/ToolbarItem';
import { CATEGORIES, FETCH_JACKPOT_INTERVAL, JACKPOT, OTHER, TOOLBAR_ITEMS } from '../constants';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesComponent implements OnInit {
  /** An array of toolbar items. */
  readonly toolbarItems: ToolbarItem[] = TOOLBAR_ITEMS;

  /** An observable with games related to active tab. */
  gamesToDisplay$: Observable<Game[]>;

  /** Defines if "NEW" ribbon can be shown. */
  canShowNew: boolean;

  /** Defines if "TOP" ribbon can be shown. */
  canShowTop: boolean;

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.gamesToDisplay$ = combineLatest([
      this.activeTab$, this.allGames$, this.jackpots$
    ]).pipe(
      map(([activeTab, allGames, jackpots]) => {
        return allGames
          .map(game => this.mapJackpotToGame(game, jackpots))
          .filter(game => this.isGameBelongToTab(game, activeTab));
      })
    );
  }

  /**
   * Returns an observable with string that equal to router parameter `activeTab`.
   * Observable updates properties `canShowNew` and `canShowTop`.
   */
  get activeTab$(): Observable<string> {
    return this.route.params.pipe(
      map(params => params.activeTab),
      tap(activeTab => {
        this.canShowNew = this.isCanShowNew(activeTab);
        this.canShowTop = this.isCanShowTop(activeTab);
      })
    );
  }

  /**
   * Returns an observable with array of all games.
   */
  get allGames$(): Observable<Game[]> {
    return this.gamesService.getGames();
  }

  /**
   * Returns an observable with array of jackpots information.
   * Updates every [[FETCH_JACKPOT_INTERVAL]] ms.
   */
  get jackpots$(): Observable<JackpotInfo[]> {
    return interval(FETCH_JACKPOT_INTERVAL).pipe(
      switchMap(() => this.gamesService.getJackpots())
    );
  }

  /**
   * @param activeTab The name of active tab.
   * @returns `true` if activeTab not equal to `CATEGORIES.NEW`.
   */
  isCanShowNew(activeTab: string): boolean {
    return activeTab !== CATEGORIES.NEW;
  }

  /**
   * @param activeTab The name of active tab.
   * @returns `true` if activeTab not equal to `CATEGORIES.TOP`.
   */
  isCanShowTop(activeTab: string): boolean {
    return activeTab !== CATEGORIES.TOP;
  }

  /**
   * Sets property `jackpot` to the [[Game]] instance if it exists in `jackpots` array.
   * @param game Instance of [[Game]].
   * @param jackpots An array of [[JackpotInfo]] instances.
   * @returns Instance of [[Game]].
   */
  mapJackpotToGame(game: Game, jackpots: JackpotInfo[]): Game {
    const jackpot = jackpots.find(jackpotItem => jackpotItem.game === game.id);
    return jackpot !== undefined
      ? { ...game, jackpot: jackpot.amount }
      : game;
  }

  /**
   * Checks if given [[Game]] instance should be displayed on selected `tab`.
   * @param game Instance of [[Game]].
   * @param tab The name of tab.
   * @returns `true` if game should be displayed, otherwise `false`.
   */
  isGameBelongToTab(game: Game, tab: string): boolean {
    if (tab === JACKPOT) {
      return game.jackpot !== undefined;
    }

    if (tab === OTHER) {
      return game.categories.some(c => (
        c === CATEGORIES.BALL || c === CATEGORIES.VIRTUAL || c === CATEGORIES.FUN
      ));
    }

    return game.categories.indexOf(tab) !== -1;
  }

  trackById(index: number, item: Game) {
    return item.id;
  }
}
