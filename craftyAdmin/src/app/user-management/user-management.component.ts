import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../interfaces';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  users: User[] = []

  displayedColumns: string[] = ['id', 'name'];
  dataSource: User[] = [];


  constructor(private dataService: DataService){}
  ngOnInit(): void {
    
  this.users = this.dataService.getUsers();
  this.dataSource = this.users;
  
}

 
}
