import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { UserXGame, User, Game } from 'src/app/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-add-association',
  templateUrl: './add-association.component.html',
  styleUrls: ['./add-association.component.scss']
})
export class AddAssociationComponent {
  
  userXgames : UserXGame[] = []; 
  dataSource : UserXGame[] = [];
  users : User[] = [];
  games : Game[] = [];
  selectedUserValue : User[] = [];
  selectUsers: User[] = [];
  selectedGameValue: Game[] = [];
  selectGames: Game[] = [];

  newUserId: number | undefined ;
  newGameId: number | undefined ;

  userXgameQuantity: UserXGame[] = [];
  newUserXgameQuantity: number = 1;

  UserXGameForm = new FormGroup(
    {
    userID: new FormControl(0),
    gameID: new FormControl(0),
    uXgQuantity: new FormControl(1)

    }
  );
  
  constructor(public dialogRef: MatDialogRef<AddAssociationComponent>, private dataService: DataService){
    dataService.usersObservable.subscribe((users : User[])=>{
      this.users = users; 
    })
    dataService.gamesObservable.subscribe((games : Game[])=>{
      this.games = games;
    })
  };

  userChange(event: MatSelectChange): void
  {
    const selectedUser: User = event.value;
    this.newUserId = selectedUser.userID;
  }

  gameChange(event: MatSelectChange): void
  {
    const selectedGame: Game = event.value;
    this.newGameId = selectedGame.gameID;
    console.log(this.newGameId, "gameId")
  }

  changeQuantity(event: any) : void
  {
    let associationQuantity : number = 1;
    if (event.target && event.target.value)
    {
      associationQuantity = parseInt(event.target.value);
    }
    
    this.newUserXgameQuantity = associationQuantity;
    
    console.log(associationQuantity, event, "userXgameQuantity"); 
  }
  
  newAssociation(){
    
    const userID : number = this.newUserId as number;

    const gameID : number = this.newGameId as number;

    const quantity: number = this.newUserXgameQuantity as number;

      this.dataService.postUserXGames({
        userID,
        gameID,
        quantity
        
      }).subscribe((userXgame)=>{
        console.log(userXgame)
      }
      )

      setTimeout( 
        ()=>{
      this.dataService.setUserXGames();
      }, 1000
    )
  this.dialogRef.close();
  };


}
