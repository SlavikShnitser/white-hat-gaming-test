import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { GamesService } from './games.service';

const routes: Routes = [
  {
    path: ':activeTab',
    component: GamesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [GamesService]
})
export class GamesRoutingModule { }
