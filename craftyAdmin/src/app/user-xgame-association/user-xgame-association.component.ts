import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UserXGame, User, Game, UiUserXGame } from '../interfaces';

import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { AddAssociationComponent } from './add-association/add-association.component';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

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

  columnsToDisplay = ['userID', 'username', 'gameID', 'gameName'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  dataSource: UserXGame[] = [];
  uiUsersXgames:  UiUserXGame[] = [];
  usersXgames: UserXGame[] = [];
  users: User[] = [];
  games: Game[] = [];

  expandedUserXGame: UiUserXGame | undefined;
  expandedUserXGameUserID: number | undefined;
  expandedUserXGameGameID: number | undefined;

  newUserID : number | undefined;
  newGameID : number | undefined;

  expandedUserID: number | undefined;
  expandedUsername : string | undefined;

  expandedGameID: number | undefined;
  expandedGamename : string | undefined;
  

  constructor( private dataService: DataService, public dialog: MatDialog){}
  
  ngOnInit(): void {

    this.dataService.userXGamesObservable.subscribe(
      (userXgames:UserXGame[])=>{
    this.usersXgames = userXgames;
    this.dataSource = structuredClone(this.usersXgames).filter((userXgame:UserXGame)=>{
      const isDeletedValue : number = userXgame.deleted as unknown as number; 
      return isDeletedValue === 0;
    });
    });

    this.dataService.userXGamesObservable.subscribe(
      (userXgames: UiUserXGame[])=>{
        this.usersXgames = userXgames;
        this.mergeData();
    });

    this.dataService.usersObservable.subscribe(
      (user:User[])=>{
        this.users = user;
        this.mergeData();
      })

    this.dataService.gamesObservable.subscribe(
      (game:Game[])=>{
      this.games= game;
      this.mergeData();
    })
  }

  toggleAtt(userXgame: UiUserXGame, event : MouseEvent)
  {
    if(this.expandedUserXGameUserID === undefined){
      this.expandedUserXGameUserID = userXgame.userID;
      this.expandedUserXGameGameID = userXgame.gameID
    } else if(this.expandedUserXGameUserID !== undefined){
      this.expandedUserXGameUserID = undefined;
      this.expandedUserXGameGameID = undefined;
    }

    if(this.expandedUserXGameUserID !== userXgame.userID){
        this.expandedUsername = undefined;
        this.expandedGamename = undefined;
      } else {
        this.expandedUsername = userXgame.username;
        this.expandedGamename = userXgame.gameName;
    }

    event.stopPropagation();
  }

  mergeData(): void
  {
    if (this.users.length > 0
        && this.games.length > 0
        && this.usersXgames.length > 0
      )
    {
      this.usersXgames.forEach(
        (userXGame: UserXGame) =>
        {
          const uiUserXGame: Partial<UiUserXGame> = userXGame;
          
          const userObject: User = this.users.find( (user: User) => user.userID === userXGame.userID ) as User;
          
          const gameObject: Game = this.games.find( (game: Game) => game.gameID === userXGame.gameID) as Game;
          
          uiUserXGame.username = userObject.username;

          uiUserXGame.gameName = gameObject.gameName;

          const finalUserGameRecord: UiUserXGame = uiUserXGame as UiUserXGame;

          this.uiUsersXgames.push(finalUserGameRecord);
        }
      )
      this.dataSource = this.usersXgames.filter((userXgame:UserXGame)=>{
        const isDeletedValue : number = userXgame.deleted as unknown as number; 
        return isDeletedValue === 0;
      });
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open( AddAssociationComponent, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  userXGamePatchForm = new FormGroup({
    userID : new FormControl(0),
    gameID : new FormControl(0),
    deleted : new FormControl(false)
  });

  userChange(event: MatSelectChange) : void
  {
    const selectedUser: User = event.value;
    this.newUserID = selectedUser.userID;
    // console.log(event, "event")
    // console.log(selectedUser, selectedUser.username, "selectedUser");
    // console.log(this.newUserID, "newUserID");
  }

  gameChange(event: MatSelectChange) : void
  {
    const selectedGame: Game = event.value;
    this.newGameID = selectedGame.gameID;
    // console.log(event, "event");
    // console.log(selectedGame, selectedGame.gameName, "selectedGame")
    // console.log(this.newGameID, "newGameID");
  }

  patchedUserXGame(userXgameID : number){
    const userID : number = this.newUserID as number;
    const gameID : number = this.newGameID as number;
    const deleted : boolean = this.userXGamePatchForm.controls.deleted.value as boolean;

    const changedUserXGame : Partial<UserXGame> = {userXgameID, userID, gameID, deleted};
    console.log(userXgameID)
    console.log("changedUserXGame",changedUserXGame)
    this.dataService.patchUserXGame(
      changedUserXGame
    ).subscribe((userXGame)=>{
      console.log(userXGame)
    })

    console.log(JSON.stringify(this.userXGamePatchForm.value))

    setTimeout(
      ()=>{
        this.dataService.setUserXGames()
      },1000
    )
  }

  softDeleteUserXGame(userXgameID : number){
    this.dataService.deleteUserXGames(userXgameID);

    setTimeout(
      ()=>{
    this.dataService.userXGameReq.subscribe(
      (usersXgames: any): void=>
      {
        this.usersXgames = usersXgames.data;
        this.dataService.userXGamesObservable.next(this.usersXgames);

      })
    this.dataService.userXGamesObservable.next(this.usersXgames);
      }, 1000
    )
  };

  isShowing : boolean = true //shows deleted users
  deletedCounter: number = 0;

  showDeleted(){
    
    this.dataSource = structuredClone(this.usersXgames)
    
      if(this.deletedCounter + 1){
        this.dataSource = structuredClone(this.usersXgames).filter((userXgame)=>{
          if(this.isShowing && this.isHiding){
            return true;
         } else if (this.isShowing && this.isHiding === false){
            const isDeletedValue : number = userXgame.deleted as unknown as number; 
            return isDeletedValue === 0
         } else if (this.isShowing === false && this.isHiding){
            const isDeletedValue : number = userXgame.deleted as unknown as number;
            return isDeletedValue === 1
        }
        
      return false;
      })
      }
    this.toggleIsShowing()
    }

  toggleIsShowing(){
    this.isShowing = !this.isShowing;  
    this.deletedCounter = this.deletedCounter + 1
  }

  isHiding : boolean = true //hides active users
  hideChange : number = 0
  
  hideActive(){
    this.dataSource = structuredClone(this.usersXgames);
    
    if(this.hideChange + 1){
      this.dataSource = structuredClone(this.usersXgames).filter((userXgame)=>{
        if(this.isShowing && this.isHiding){
          const deletedUsers : number = userXgame.deleted as unknown as number;
          return deletedUsers
        } else if (this.isShowing && this.isHiding === false){
           return true
        } else if (this.isShowing === false && this.isHiding){
          return false;
        }
      const hiddenUsers : number = userXgame.deleted as unknown as number;
      return hiddenUsers === 0;
        
        
      })
    }
    this.toggleHideActive();
  }

  toggleHideActive(){
    this.isHiding = !this.isHiding;
    this.hideChange = this.hideChange + 1;
  } 

  userXgameStringFilter(event:any){
    const userXGameInput : HTMLInputElement = document.querySelector(".filterUsersXGames") as unknown as HTMLInputElement;
    const userXGameFilter = userXGameInput.value.toLocaleLowerCase()

      this.dataSource = structuredClone(this.usersXgames).filter((userXgame : UiUserXGame)=>{
      console.log(userXgame.username)
      const foundUsersXGames = userXgame.username as string;
      const foundUserXGame = foundUsersXGames.toLocaleLowerCase();

      if (foundUserXGame.includes(userXGameFilter))
      {
        return true;
      }
      else
      {
        return false;
      }
    })
    
  }
}
