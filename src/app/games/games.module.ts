import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GamesRoutingModule } from './games-routing.module';

import { GameCardComponent } from './game-card/game-card.component';
import { GamesComponent } from './games/games.component';

@NgModule({
  declarations: [GameCardComponent, GamesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
