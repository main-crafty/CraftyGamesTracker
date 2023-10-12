import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Game } from '../interfaces';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { CreateGameComponent } from './create-game/create-game.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-game-management',
  templateUrl: './game-management.component.html',
  styleUrls: ['./game-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GameManagementComponent implements OnInit {

  columnsToDisplay = ['gameName', 'gameDescription'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  dataSource: Game[] = [];
  games: Game[] = [];

  searchText='';

  expandedGame: Game | undefined;
  expandedGameID: number| undefined;
  expandedGameName: string | undefined;
  expandedGameDescription: string | undefined;

  isShowing : boolean = false //shows deleted games
  isHiding : boolean = false //hides active games
  
  constructor( private dataService: DataService,public dialog: MatDialog){}
  
  ngOnInit(): void {
    
    this.dataService.gamesObservable.subscribe(
      (games:Game[])=>{
      this.games = games;
      this.dataSource = structuredClone(this.games).filter((game:Game)=>{
        const isDeletedValue : number = game.deleted as unknown as number; 
        return isDeletedValue === 0;
      });
      });

      
  }

  toggleGame(game : Game , event : MouseEvent)
  {
    if(this.expandedGameID === game.gameID){
      this.expandedGameID = undefined;
      this.expandedGameName = undefined;
      this.expandedGameDescription = undefined;
    } else {
      this.expandedGameID = game.gameID;
      this.expandedGameName = game.gameName;
      this.expandedGameDescription = game.gameDescription;
    }
    event.stopPropagation();
  }
 
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open( CreateGameComponent, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
}

gamePatchForm = new FormGroup(
  {
    gameName: new FormControl(''),
    gameDescription: new FormControl(''),
    deleted: new FormControl(false)
  }
)

patchedGame(gameID: number){
  const gameName : string = this.gamePatchForm.controls.gameName.value as string;
  const gameDescription : string = this.gamePatchForm.controls.gameDescription.value as string;
  const deleted : boolean = this.gamePatchForm.controls.deleted.value as boolean;

  const changedGame : Partial<Game> = {gameID, gameName, gameDescription, deleted};

  this.dataService.patchGame(
    changedGame
  );

  console.log(JSON.stringify(this.gamePatchForm.value))

  setTimeout(()=>{
    this.dataService.setGames();
  }), 1000
  
}

softDeleteGame(gameID : number){
  this.dataService.deleteGame(gameID);

  setTimeout(
    ()=>{
  this.dataService.gameReq.subscribe(
    (games: any): void=>
    {
      this.games = games.data;
      this.dataService.gamesObservable.next(this.games);

    })
  this.dataService.gamesObservable.next(this.games);
    }, 1000
  )
}
//************************************************************************************************************************** */
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

gameStringFilter(event:any){
  const gameInput : HTMLInputElement = event.target as HTMLInputElement;

    this.searchText = gameInput.value.toLocaleLowerCase(); 
    this.updateTable();  
}

updateTable(): void
  {
    this.dataSource = this.games
    .filter((game) => {
      const foundGameAttributes = `${game.gameName} ${game.gameDescription}`.toLowerCase();
      //const searchText = userInput.value.toLocaleLowerCase();
      let showDeletedGame = foundGameAttributes.includes(this.searchText);

      let hideActiveGame = foundGameAttributes.includes(this.searchText);

      // make sure deleted games are hidden if isShowing is false 
      if (
        !this.isShowing // the user does NOT want to see deleted games
        && game.deleted == true // the user is deleted
        && this.searchText !== undefined
        )
      {
        showDeletedGame = false;
      }

      if(
        this.isHiding // the user does NOT want to see active games
        && game.deleted == false // the user is active
        && this.searchText !== undefined
        )
      {
        hideActiveGame = false;
      }
      
      return hideActiveGame && showDeletedGame;
  })
  }
}
