import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    const url = `${API_PATH}/games.json`;
    return this.http.get<Game[]>(url);
  }

  /**
   * Fetches array of jackpots.
   * @returns Observable with array of jackpots information items.
   */
  getJackpots(): Observable<JackpotInfo[]> {
    const url = `${API_PATH}/jackpots.json`;
    return this.http.get<JackpotInfo[]>(url)
      .pipe(
        map((jackpots) => this.handleJackpotsUpdate(jackpots))
      );
  }

  /**
   * Randomly update jackpot value for array of jackpots information items.
   * @param jackpots An array of jackpots information items.
   * @returns An array of jackpots information items.
   */
  private handleJackpotsUpdate(jackpots: JackpotInfo[]): JackpotInfo[] {
    return jackpots.map(jackpot => {
      return {
        ...jackpot,
        amount: Math.round(Math.random() * 50000)
      };
    });
  }
}
