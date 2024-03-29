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
  searchText = '';

  expandedUser: User | undefined;
  expandedUserID : number | undefined;
  expandedUsername : string | undefined;
  expandedNickname : string | undefined;
  expandedTiktokName : string | undefined;

    isShowing : boolean = false //shows deleted users
    isHiding : boolean = false //hides active users
  
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

  restoreDeleted(userID : number){

    const username : string = this.userPatchForm.controls.username.value as string;
    const nickname : string = this.userPatchForm.controls.nickname.value as string;
    const tiktok: boolean = this.userPatchForm.controls.tiktok.value as boolean;
    const tiktokName : string = this.userPatchForm.controls.tiktokName.value as string;
    const deleted : boolean = 0 as unknown as boolean;

    const unDeleteUser : Partial<User> = {userID, username, nickname, tiktok, tiktokName, deleted}

    this.dataService.patchUser(
      unDeleteUser
    );

    setTimeout(
      ()=>{
        this.dataService.setUsers()
      }, 1000
    )

    this.updateTable();

  }
//***************************************************************************************************************************************  */
  showDeleted(){
    this.toggleIsShowing();
    this.updateTable();
  }

  toggleIsShowing(){
    this.isShowing = !this.isShowing;
  }
  
  hideActive(){
    this.toggleIsHiding();
    this.updateTable();
  }

  toggleIsHiding(){
    this.isHiding = !this.isHiding;
  }
    
  userStringFilter(event: KeyboardEvent){
    const userInput : HTMLInputElement = event.target as HTMLInputElement;

    this.searchText = userInput.value.toLocaleLowerCase(); 
    this.updateTable();    
  };

  updateTable(): void
  {
    this.dataSource = this.users
    .filter((user) => {
      const foundUserAttributes = `${user.username} ${user.nickname} ${user.tiktokName}`.toLowerCase();
      
      let showDeletedUser = foundUserAttributes.includes(this.searchText);

      let hideActiveUser = foundUserAttributes.includes(this.searchText);

      if(
        !this.isShowing 
        && user.deleted == true
        && this.searchText !== undefined
        )
      {
        showDeletedUser = false
      }

      if(
        this.isHiding // the user does NOT want to see active users
        && user.deleted == false // the user is active
        && this.searchText !== undefined
        )
      {
        hideActiveUser = false;
      }
      return hideActiveUser && showDeletedUser;
  })
  }
}

  
    


  

