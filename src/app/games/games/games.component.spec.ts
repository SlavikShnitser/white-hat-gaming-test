import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesComponent } from './games.component';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesComponent ]
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

  });

  it('should check if "TOP" ribbon can be displayed', () => {

  });

  it('should map jackpot amount to game', () => {

  });

  it('should filter games list by category', () => {

  });

  it('should filter games by jackpot value', () => {

  });

  it('should display proper games in section "other"', () => {

  });
});
