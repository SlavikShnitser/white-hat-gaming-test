import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Game } from './models/Game';
import { JackpotInfo } from './models/JackpotInfo';
import { API_PATH } from './constants';

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
    const url = `${API_PATH}/games.php`;
    return this.http.get<Game[]>(url);
  }

  /**
   * Fetches array of jackpots.
   * @returns Observable with array of jackpots information.
   */
  getJackpots(): Observable<JackpotInfo[]> {
    const url = `${API_PATH}/jackpots.php`;
    return this.http.get<JackpotInfo[]>(url);
  }
}
