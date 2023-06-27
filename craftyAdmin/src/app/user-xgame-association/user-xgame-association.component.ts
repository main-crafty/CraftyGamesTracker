import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UserXGame } from '../interfaces';

import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-user-xgame-association',
  templateUrl: './user-xgame-association.component.html',
  styleUrls: ['./user-xgame-association.component.scss'],
  animations: [
    trigger('userXgameDetailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserXgameAssociationComponent implements OnInit{

  columnsToDisplay = ['id', 'userId', 'gameId', 'deleted'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  dataSource: UserXGame[] = [];
  usersXgames: UserXGame[] = [];
  expandedUserXGame: UserXGame[] = [];

  constructor( private dataService: DataService){}
  
  ngOnInit(): void {
    this.dataService.userXGamesObservable.subscribe((usersXgames:UserXGame[])=>{
      this.usersXgames = this.dataService.getUserXGames();
      this.dataSource = structuredClone(usersXgames)
    })
    this.usersXgames = this.dataService.getUserXGames();
    this.dataSource = this.usersXgames;
  }

}
