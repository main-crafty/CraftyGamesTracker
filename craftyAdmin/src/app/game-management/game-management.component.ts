import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Game } from '../interfaces';

@Component({
  selector: 'app-game-management',
  templateUrl: './game-management.component.html',
  styleUrls: ['./game-management.component.scss']
})
export class GameManagementComponent implements OnInit {

  games : Game[] = [];

  constructor( private service: DataService){}
  ngOnInit(): void {
    
    this.games = this.service.getGames();
  }
}
