import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Game } from '../models/Game';
import { RibbonConfig } from '../models/RibbonConfig';
import { CATEGORIES, NEW_RIBBON_CONFIG, TOP_RIBBON_CONFIG } from '../constants';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameCardComponent implements OnInit, OnChanges {
  /** An instance of [[Game]] to be displayed. */
  @Input()
  game: Game;

  /** Defines if ribbon "new" can be displayed. */
  @Input()
  canShowNew: boolean;

  /** Defines if ribbon "top" can be displayed. */
  @Input()
  canShowTop: boolean;

  /**
   *  Configuration object of the ribbon.
   *  Set to `null` to hide the ribbon.
   */
  ribbonConfig: RibbonConfig;

  /** Set to `true` to hide component. */
  hidden = false;

  ngOnInit(): void {
    this.ribbonConfig = this.getRibbonConfig();
  }

  ngOnChanges() {
    this.ribbonConfig = this.getRibbonConfig();
  }

  /**
   * Based on component inputs selects one of predefined ribbon configs.
   * Ribbon "NEW" has higher priority than ribbon "TOP".
   * @returns Configuration object of the ribbon or `null`.
   */
  getRibbonConfig(): RibbonConfig {
    if (this.canShowNew && this.game.categories.indexOf(CATEGORIES.NEW) !== -1) {
      return NEW_RIBBON_CONFIG;
    }
    if (this.canShowTop && this.game.categories.indexOf(CATEGORIES.TOP) !== -1) {
      return TOP_RIBBON_CONFIG;
    }
    return null;
  }

  /**
   * Handles error of image load.
   */
  imageLoadErrorHandler() {
    this.hidden = true;
  }
}
