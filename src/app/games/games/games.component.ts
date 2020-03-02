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
    const activeTab$ = this.route.params.pipe(
      map(params => params.activeTab),
      tap(activeTab => {
        this.canShowNew = this.isCanShowNew(activeTab);
        this.canShowTop = this.isCanShowTop(activeTab);
      })
    );
    const allGames$ = this.gamesService.getGames();
    const jackpots$ = interval(FETCH_JACKPOT_INTERVAL).pipe(
      switchMap(() => this.gamesService.getJackpots())
    );

    this.gamesToDisplay$ = combineLatest([
      activeTab$, allGames$, jackpots$
    ]).pipe(
      map(([activeTab, games, jackpots]) => {
        return games
          .map(game => this.mapJackpotToGame(game, jackpots))
          .filter(game => this.isGameBelongToTab(game, activeTab));
      })
    );
  }

  trackById(item: Game) {
    return item.id;
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
      ? { ...game, jackpot: jackpot.amount } as Game
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

}
