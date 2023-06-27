import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../interfaces';

import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  animations: [
    trigger('userDetailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserManagementComponent implements OnInit {

  columnsToDisplay = ['userID', 'username', 'nickname', 'tiktok','tikTokName', 'deleted'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  dataSource: User[] = [];
  users: User[] = [];
  expandedUser: User[] = [];
  
  constructor( private dataService: DataService){}
  
  ngOnInit(): void {
    
    this.dataService.usersObservable.subscribe(
      (users:User[])=>{
      console.log(users,"ASKDFJWEIFJIO")
    this.users = users;
    this.dataSource = structuredClone(this.users);
    });

  }
 
}
