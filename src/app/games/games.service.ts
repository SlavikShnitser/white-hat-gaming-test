import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Game } from './models/Game';
import { JackpotInfo } from './models/JackpotInfo';

@Injectable()
export class GamesService {
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Fetches all games.
   * @returns Observable with array of all games.
   */
  getGames(): Observable<Game[]> {
    const url = 'http://stage.whgstage.com/front-end-test/games.php';
    return this.http.get<Game[]>(url);
  }

  /**
   * Fetches array of jackpots.
   * @returns Observable with array of jackpots information.
   */
  getJackpots(): Observable<JackpotInfo[]> {
    const url = 'http://stage.whgstage.com/front-end-test/jackpots.php';
    return this.http.get<JackpotInfo[]>(url);
  }
}
