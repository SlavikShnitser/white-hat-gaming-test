import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardComponent } from './game-card.component';
import { CATEGORIES } from '../constants';
import { getGame } from '../test-utils';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

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
    component.game = getGame([]);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should not render jackpot block', () => {
    component.game = getGame([]);
    fixture.detectChanges();

    const jackpotContainer = fixture.nativeElement.querySelector('.game-card__jackpot');
    expect(jackpotContainer).toBe(null);
  });

  it('should render jackpot block for games with jackpot', () => {
    component.game = getGame([], 34418);
    fixture.detectChanges();

    const jackpotContainer = fixture.nativeElement.querySelector('.game-card__jackpot');
    expect(jackpotContainer).toBeDefined();
  });

  it('should format jackpot value', () => {
    component.game = getGame([], 34418);
    fixture.detectChanges();

    const jackpotContainer = fixture.nativeElement.querySelector('.game-card__jackpot');
    expect(jackpotContainer.innerText).toBe('£34,418.00');
  });

  it('should show "NEW" ribbon', () => {
    component.game = getGame([CATEGORIES.NEW]);
    component.canShowNew = true;
    fixture.detectChanges();

    const ribbonElement = fixture.nativeElement.querySelector('.ribbon');
    expect(ribbonElement).toBeDefined();
    expect(ribbonElement.classList.contains('new')).toBe(true);
  });

  it('should show "TOP" ribbon', () => {
    component.game = getGame([CATEGORIES.TOP]);
    component.canShowTop = true;
    fixture.detectChanges();

    const ribbonElement = fixture.nativeElement.querySelector('.ribbon');
    expect(ribbonElement).toBeDefined();
    expect(ribbonElement.classList.contains('top')).toBe(true);
  });

  it('should show "NEW" ribbon if game is new and top', () => {
    component.game = getGame([CATEGORIES.NEW, CATEGORIES.TOP]);
    component.canShowNew = true;
    component.canShowTop = true;
    fixture.detectChanges();

    const ribbonElement = fixture.nativeElement.querySelector('.ribbon');
    expect(ribbonElement).toBeDefined();
    expect(ribbonElement.classList.contains('new')).toBe(true);
  });

  it('should not show ribbon for game without "NEW" or "TOP" categories', () => {
    component.game = getGame([]);
    component.canShowNew = true;
    component.canShowTop = true;
    fixture.detectChanges();

    const ribbonElement = fixture.nativeElement.querySelector('.ribbon');
    expect(ribbonElement).toBe(null);
  });
});
