import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UserXGame } from '../interfaces';

@Component({
  selector: 'app-user-xgame-association',
  templateUrl: './user-xgame-association.component.html',
  styleUrls: ['./user-xgame-association.component.scss']
})
export class UserXgameAssociationComponent implements OnInit {

  userXgame : UserXGame[] = [];

  constructor(private DataService: DataService){}
  ngOnInit(): void {
    
    this.userXgame = this.DataService.getUserXGames();
  }
}
