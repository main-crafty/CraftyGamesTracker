import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Game } from '../interfaces';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-game-management',
  templateUrl: './game-management.component.html',
  styleUrls: ['./game-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GameManagementComponent implements OnInit {


  columnsToDisplay = ['id', 'gameName', 'gameDescription', 'deleted'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  dataSource: Game[] = [];
  games: Game[] = [];
  expandedGame: Game[] = [];
  
  constructor( private dataService: DataService){}
  
  ngOnInit(): void {
    this.dataService.gamesObservable.subscribe((games:Game[])=>{
      this.games = this.dataService.getGames();
      this.dataSource = structuredClone(this.games)
    })
    // this.games = this.dataService.getGames();
    // this.dataSource = this.games;
  }
 
}
