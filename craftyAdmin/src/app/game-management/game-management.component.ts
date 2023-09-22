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

  expandedGame: Game | undefined;
  expandedGameID: number| undefined;
  expandedGameName: string | undefined;
  expandedGameDescription: string | undefined;
  
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

isShowing : boolean = false //shows deleted games
deletedCounter: number = 0;

showDeleted(){
  this.toggleIsShowing()
  this.dataSource = structuredClone(this.games)
  
  if(this.deletedCounter + 1){
    this.dataSource = structuredClone(this.games).filter((game)=>{
      if(this.isShowing && this.isHiding){
        
        return true;
      } else if (this.isShowing && this.isHiding === false){
        const isDeletedValue : number = game.deleted as unknown as number; 
        return isDeletedValue === 1
      } else if (this.isShowing === false && this.isHiding){
        const isDeletedValue : number = game.deleted as unknown as number;
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

isHiding : boolean = true //hides active games
hideChange : number = 0

hideActive(){
  this.dataSource = structuredClone(this.games);
  
  if(this.hideChange + 1){
    this.dataSource = structuredClone(this.games).filter((game)=>{
      if(this.isShowing && this.isHiding){
        const deletedGames : number = game.deleted as unknown as number;
      return deletedGames
        } else if (this.isShowing && this.isHiding === false){
         return true
      } else if (this.isShowing === false && this.isHiding){
        return false;
      }
      const hiddenGames : number = game.deleted as unknown as number;
      return hiddenGames === 0;
      
      
    })
  }
  this.toggleHideActive();
}

toggleHideActive(){
  this.isHiding = !this.isHiding;
  this.hideChange = this.hideChange + 1;
}

gameStringFilter(event:any){
  const gameInput : HTMLInputElement = document.querySelector(".filterGames") as unknown as HTMLInputElement;
  const gameFilter = gameInput.value.toLocaleLowerCase();

    this.dataSource = structuredClone(this.games).filter((game)=>{
    const foundNames = game.gameName;
    const foundName = foundNames.toLocaleLowerCase();
    
    if(foundName.includes(gameFilter)){
      return true
    }else{
      return false
    }
    })
  
}
}
