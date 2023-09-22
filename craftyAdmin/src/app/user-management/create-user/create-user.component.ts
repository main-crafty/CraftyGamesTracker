import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/interfaces';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserManagementComponent } from '../user-management.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  users: User[] = [];
  dataSource: User[] = [];

  userForm = new FormGroup(
    { 
    username:  new FormControl(''),
    nickname: new FormControl(''),
    tiktok: new FormControl(true),
    tiktokName: new FormControl('')
    }
  );

  
  constructor(public dialogRef: MatDialogRef<CreateUserComponent>, private dataService: DataService){}
 
    newUser(){
      const username : string = this.userForm.controls.username.value as string;
      const nickname : string = this.userForm.controls.nickname.value as string;
      const tiktok : boolean = this.userForm.controls.tiktok.value as boolean;
      const tiktokName : string = this.userForm.controls.tiktokName.value as string;
      
        this.dataService.postUser({
        username,
        nickname,
        tiktok,
        tiktokName
      });
      console.log(JSON.stringify(this.userForm.value));

      setTimeout(
        ()=>{
      this.dataService.userReq.subscribe(
        (users: any): void=>
        {
          this.users = users.data;
          this.dataService.usersObservable.next(this.users);
  
        })
      this.dataService.usersObservable.next(this.users);
        }, 1000
      )
      this.dialogRef.close();
    };
  

}


