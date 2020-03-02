import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GamesService } from './games.service';
import { Game } from './models/Game';
import { JackpotInfo } from './models/JackpotInfo';
import { API_PATH } from './constants';

describe('GamesService', () => {
  let service: GamesService;
  let httpTestingController: HttpTestingController;

  const dummyGames: Game[] = [
    {
      categories: [],
      name: 'Zombie Rush',
      image: '//stage.whgstage.com/scontent/images/games/LEZOMBIERUSH.jpg',
      id: 'LEZOMBIERUSH'
    }, {
      categories: [],
      name: 'The Wish Master',
      image: '//stage.whgstage.com/scontent/images/games/NETHEWISHMASTER.jpg',
      id: 'NETHEWISHMASTER'
    }
  ];

  const dummyJackpots: JackpotInfo[] = [
    {
      game: 'NEJACKANDTHEBEANSTALK',
      amount: 75308
    }, {
      game: 'LEPABLOPICASSOSLOT',
      amount: 36148
    }, {
      game: 'NEFLOWERS',
      amount: 22593
    }, {
      game: 'NESTARBURST',
      amount: 112963
    }, {
      game: 'NEALIENS',
      amount: 64550
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ GamesService ],
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(GamesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all games', () => {
    service.getGames().subscribe(games => {
      expect(games.length).toBe(2);
      expect(games).toEqual(dummyGames);
    });
    const request = httpTestingController.expectOne( `${API_PATH}/games.php`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyGames);
  });

  it('should retrieve jackpots information', () => {
    service.getJackpots().subscribe(jackpots => {
      expect(jackpots.length).toBe(5);
      expect(jackpots).toEqual(dummyJackpots);
    });
    const request = httpTestingController.expectOne( `${API_PATH}/jackpots.php`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyJackpots);
  });
});
