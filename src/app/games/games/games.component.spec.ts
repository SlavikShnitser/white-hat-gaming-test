import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GamesComponent } from './games.component';
import { GamesService } from '../games.service';
import { JackpotInfo } from '../models/JackpotInfo';
import { CATEGORIES } from '../constants';
import { getGame } from '../test-utils';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;

  const gamesServiceStub: Partial<GamesService> = {
    getGames: () => of([]),
    getJackpots: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ GamesComponent ],
      providers: [
        { provide: GamesService, useValue: gamesServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if "NEW" ribbon can be displayed', () => {
    expect(component.isCanShowNew('any-path')).toBe(true);
    expect(component.isCanShowNew(CATEGORIES.NEW)).toBe(false);
  });

  it('should check if "TOP" ribbon can be displayed', () => {
    expect(component.isCanShowTop('any-path')).toBe(true);
    expect(component.isCanShowTop(CATEGORIES.TOP)).toBe(false);
  });

  it('should map jackpot amount to game', () => {
    const game = getGame([]);
    const jackpots: JackpotInfo[] = [
      { game: 'GAME_ID_1', amount: 1234 },
      { game: 'GAME_ID_2', amount: 2345 },
      { game: game.id, amount: 3456 },
      { game: 'GAME_ID_4', amount: 4567 }
    ];

    const gameWithJackpot = component.mapJackpotToGame(game, jackpots);

    expect(gameWithJackpot.jackpot).toBe(3456);
  });

  it('should filter games list by category', () => {
    const pokerGame = getGame([CATEGORIES.POKER]);
    const topPokerGame = getGame([CATEGORIES.TOP, CATEGORIES.POKER]);

    expect(component.isGameBelongToTab(pokerGame, 'top')).toBe(false);
    expect(component.isGameBelongToTab(pokerGame, 'poker')).toBe(true);
    expect(component.isGameBelongToTab(topPokerGame, 'top')).toBe(true);
    expect(component.isGameBelongToTab(topPokerGame, 'poker')).toBe(true);
  });

  it('should filter games by jackpot value', () => {
    const gameWithJackpot = getGame([], 1234);
    const gameWithoutJackpot = getGame([]);

    expect(component.isGameBelongToTab(gameWithJackpot, 'jackpot')).toBe(true);
    expect(component.isGameBelongToTab(gameWithoutJackpot, 'jackpot')).toBe(false);
  });

  it('should display proper games in section "other"', () => {
    const ballGame = getGame([CATEGORIES.BALL]);
    const virtualGame = getGame([CATEGORIES.VIRTUAL]);
    const funGame = getGame([CATEGORIES.FUN]);

    expect(component.isGameBelongToTab(ballGame, 'other')).toBe(true);
    expect(component.isGameBelongToTab(virtualGame, 'other')).toBe(true);
    expect(component.isGameBelongToTab(funGame, 'other')).toBe(true);
  });
});
