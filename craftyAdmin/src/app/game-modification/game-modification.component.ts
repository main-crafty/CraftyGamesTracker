import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game, User, UserXGame } from '../interfaces';
import { DataService } from '../data.service';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


@Component({
  selector: 'app-game-modification',
  templateUrl: './game-modification.component.html',
  styleUrls: ['./game-modification.component.scss'],
  
})
export class GameModificationComponent implements OnInit, OnDestroy {
 
  myControl = new FormControl('');
  options: Game[] = [];
  userGames: UserXGame[] = [];
  users: User[] = [];
  filteredOptions: Game[] = [];
  selectedGame: Game | undefined;
  selectedUserIds: number[] = [];
  selectedUserNames: string[] = [];
  userListText = '';

  gamesSub: Subscription | undefined;
  gamesUsersSub: Subscription | undefined;
  usersSub: Subscription | undefined;

  constructor(private dataService: DataService){}


  ngOnInit() {
    this.usersSub = this.dataService.usersObservable.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );

    this.gamesSub = this.dataService.gamesObservable.subscribe(
      (games: Game[])=>{
      this.options = games;
      //this.myControl.reset();
      this.filteredOptions = games;
      });

      this.gamesUsersSub = this.dataService.userXGamesObservable.subscribe(
        (userXGames: UserXGame[])=>{
        this.userGames = userXGames;
        });


    // this filters the drop down list
    // this.myControl.valueChanges.subscribe(
    //   (searchText) => {
    //     this.filteredOptions = this.options.filter(
    //       (game) => {
    //         if (searchText === '')
    //         {
    //           return true;
    //         } else if (searchText && game.gameName.includes(searchText))
    //         {
    //           return true;
    //         } else if (searchText && game.gameDescription.includes(searchText))
    //         {
    //           return true;
    //         }
    //         return false;
    //       }
    //     );
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.gamesSub?.unsubscribe();
    this.gamesUsersSub?.unsubscribe();
    this.usersSub?.unsubscribe();
  }

  gameSelected(event:  MatAutocompleteSelectedEvent): void
  {
    this.selectedGame = this.options.find( (g) => g.gameID === event.option.value ) as Game;
    const gameName = this.selectedGame.gameName;
    this.myControl.setValue(gameName);

    this.selectedUserIds = this.userGames
                            .filter( (ug: UserXGame) => ug.gameID === this.selectedGame?.gameID ) // find all records for the game 
                            .map( (ug: UserXGame) => ug.userID );

    this.selectedUserNames = this.selectedUserIds.map( (id: number) => {
      const user = this.users.find( (user: User) => user.userID === id );
      const userName = user?.username as string;
      return userName;
    } );

    this.userListText = '';
    this.selectedUserNames.forEach(
      (userName: string) => this.userListText = this.userListText + userName + '\r\n'
    );
  }
}
