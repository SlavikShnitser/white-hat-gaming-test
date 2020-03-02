import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardComponent } from './game-card.component';
import { Game } from '../models/Game';
import { CATEGORIES } from '../constants';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  const game: Game = {
    categories: [],
    name: 'Zombie Rush',
    image: '//stage.whgstage.com/scontent/images/games/LEZOMBIERUSH.jpg',
    id: 'LEZOMBIERUSH'
  };
  const gameWithJackpot: Game = {
    categories: [],
    name: 'The Wish Master',
    image: '//stage.whgstage.com/scontent/images/games/NETHEWISHMASTER.jpg',
    id: 'NETHEWISHMASTER',
    jackpot: 34418
  };
  const topGame: Game = {
    categories: [CATEGORIES.TOP],
    name: 'The Wish Master',
    image: '//stage.whgstage.com/scontent/images/games/NETHEWISHMASTER.jpg',
    id: 'NETHEWISHMASTER'
  };
  const newGame: Game = {
    categories: [CATEGORIES.NEW],
    name: 'The Wish Master',
    image: '//stage.whgstage.com/scontent/images/games/NETHEWISHMASTER.jpg',
    id: 'NETHEWISHMASTER'
  };
  const topNewGame: Game = {
    categories: [CATEGORIES.TOP, CATEGORIES.NEW],
    name: 'The Wish Master',
    image: '//stage.whgstage.com/scontent/images/games/NETHEWISHMASTER.jpg',
    id: 'NETHEWISHMASTER'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.game = game;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should not render jackpot block', () => {
    component.game = game;
    fixture.detectChanges();

    const jackpotContainer = fixture.nativeElement.querySelector('.game-card__jackpot');
    expect(jackpotContainer).toBe(null);
  });

  it('should render jackpot block for games with jackpot', () => {
    component.game = gameWithJackpot;
    fixture.detectChanges();

    const jackpotContainer = fixture.nativeElement.querySelector('.game-card__jackpot');
    expect(jackpotContainer).toBeDefined();
  });

  it('should format jackpot value', () => {
    component.game = gameWithJackpot;
    fixture.detectChanges();

    const jackpotContainer = fixture.nativeElement.querySelector('.game-card__jackpot');
    expect(jackpotContainer.innerText).toBe('£34,418.00');
  });

  it('should show "NEW" ribbon', () => {
    component.game = newGame;
    component.canShowNew = true;
    fixture.detectChanges();

    const ribbonElement = fixture.nativeElement.querySelector('.ribbon');
    expect(ribbonElement).toBeDefined();
    expect(ribbonElement.classList.contains('new')).toBe(true);
  });

  it('should show "TOP" ribbon', () => {
    component.game = topGame;
    component.canShowTop = true;
    fixture.detectChanges();

    const ribbonElement = fixture.nativeElement.querySelector('.ribbon');
    expect(ribbonElement).toBeDefined();
    expect(ribbonElement.classList.contains('top')).toBe(true);
  });

  it('should show "NEW" ribbon if game is new and top', () => {
    component.game = topNewGame;
    component.canShowNew = true;
    component.canShowTop = true;
    fixture.detectChanges();

    const ribbonElement = fixture.nativeElement.querySelector('.ribbon');
    expect(ribbonElement).toBeDefined();
    expect(ribbonElement.classList.contains('new')).toBe(true);
  });

  it('should not show ribbon for game without "NEW" or "TOP" categories', () => {
    component.game = game;
    component.canShowNew = true;
    component.canShowTop = true;
    fixture.detectChanges();

    const ribbonElement = fixture.nativeElement.querySelector('.ribbon');
    expect(ribbonElement).toBe(null);
  });
});
