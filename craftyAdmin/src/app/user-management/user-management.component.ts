import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../interfaces';
import { CreateUserComponent } from './create-user/create-user.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

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

  columnsToDisplay = ['username', 'nickname', 'tiktokName'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  dataSource: User[] = [];
  users: User[] = [];

  expandedUser: User | undefined;
  expandedUserID : number | undefined;
  expandedUsername : string | undefined;
  expandedNickname : string | undefined;
  expandedTiktokName : string | undefined;
  
  constructor( private dataService: DataService, public dialog: MatDialog){}
  
  ngOnInit(): void {
    
    this.dataService.usersObservable.subscribe(
      (users:User[])=>{
    this.users = users;
    this.dataSource = structuredClone(this.users).filter((user:User)=>{
      const isDeletedValue : number = user.deleted as unknown as number; 
      return isDeletedValue === 0;
    });
    });

//console.log('I LIVE');

    if (this.expandedUser !== undefined)
    {
      
      this.userPatchForm.controls.username.setValue(this.expandedUser.username)

    }
  }

  toggleRow(user : User, event : MouseEvent)
  {
    if(this.expandedUserID == user.userID){
      this.expandedUserID = undefined;
      this.expandedUsername = undefined;
      this.expandedNickname = undefined
      this.expandedTiktokName = undefined;
    } else {    
      this.expandedUserID = user.userID;
      this.expandedUsername = user.username;
      this.expandedNickname = user.nickname;
      this.expandedTiktokName = user.tiktokName;
    }
    event.stopPropagation();
    console.log(user, event, "event");
  }
  

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open( CreateUserComponent, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  };

  userPatchForm = new FormGroup(
    {
    username: new FormControl(''),
    nickname: new FormControl(''),
    tiktok: new FormControl(true),
    tiktokName: new FormControl(''),
    deleted: new FormControl(false)
    }
  )

  patchedUser(userID: number){
    const username : string = this.userPatchForm.controls.username.value as string;
    const nickname : string = this.userPatchForm.controls.nickname.value as string;
    const tiktok: boolean = this.userPatchForm.controls.tiktok.value as boolean;
    const tiktokName : string = this.userPatchForm.controls.tiktokName.value as string;
    const deleted : boolean = this.userPatchForm.controls.deleted.value as boolean;

    const changedUser : Partial<User> = {userID, username, nickname, tiktok, tiktokName, deleted};

    this.dataService.patchUser(
      changedUser
      );

    console.log(userID);
    console.log(JSON.stringify(this.userPatchForm.value));
   
    setTimeout(
      ()=>{
        this.dataService.setUsers()
      }, 1000
    )
    
  }
 
  softDeleteUser(userID : number){

    this.dataService.deleteUser(userID)

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
  };

  
  isShowing : boolean = false //shows deleted users
  deletedCounter: number = 0;

  showDeleted(){
    this.toggleIsShowing()
    this.dataSource = structuredClone(this.users)
    
    if(this.deletedCounter + 1){
      this.dataSource = structuredClone(this.users).filter((user)=>{
        if(this.isShowing && this.isHiding){
          
          return true;
        } else if (this.isShowing && this.isHiding === false){
          const isDeletedValue : number = user.deleted as unknown as number; 
          return isDeletedValue === 1
        } else if (this.isShowing === false && this.isHiding){
          const isDeletedValue : number = user.deleted as unknown as number;
          return isDeletedValue === 0
        }
        
      return false;
      })
    }
    
    }
  toggleIsShowing(){
    this.isShowing = !this.isShowing;  
    this.deletedCounter = this.deletedCounter + 1
  }

  isHiding : boolean = true //hides active users
  hideChange : number = 0
  
  hideActive(){
    this.dataSource = structuredClone(this.users);
    
    if(this.hideChange + 1){
      this.dataSource = structuredClone(this.users).filter((user)=>{
        if(this.isShowing && this.isHiding){
          const deletedUsers : number = user.deleted as unknown as number;
        return deletedUsers
          } else if (this.isShowing && this.isHiding === false){
           return true
        } else if (this.isShowing === false && this.isHiding){
          return false;
        }
        const hiddenUsers : number = user.deleted as unknown as number;
        return hiddenUsers === 0;
        
        
      })
    }
    this.toggleHideActive();
  }

  toggleHideActive(){
    this.isHiding = !this.isHiding;
    this.hideChange = this.hideChange + 1;
  }
    
  userStringFilter(event:any){
    const userInput : HTMLInputElement = document.querySelector(".filterUsers") as unknown as HTMLInputElement;
    const userFilter = userInput.value.toLocaleLowerCase();

      this.dataSource = structuredClone(this.users).filter((user)=>{
      const foundUsers = user.username;
      const foundUser = foundUsers.toLocaleLowerCase();

      if (foundUser.includes(userFilter))
      {
        return true;
      }
      else
      {
        return false;
      }
    })
    
  };

  
  }

  
    


  

