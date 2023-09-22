import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { Game } from 'src/app/interfaces';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent{
  games: Game[] = [];
  dataSource: Game[] = [];

  gameForm = new FormGroup(
    {
      gameName: new FormControl(''),
      gameDescription: new FormControl('')
    }
  );
  
constructor(public dialogRef: MatDialogRef<CreateGameComponent>, private dataService: DataService){}

  newGame(){
    const gameName : string = this.gameForm.controls.gameName.value as string;
    const gameDescription: string = this.gameForm.controls.gameDescription.value as string;
    this.dataService.postGame({
      gameName,
      gameDescription
    })
    console.log(JSON.stringify(this.gameForm.value));
    
    setTimeout(()=>{
      this.dataService.gameReq.subscribe(
        (games:any): void=>
        {
          this.games = games.data;
          this.dataService.gamesObservable.next(this.games);
        })
      this.dataService.gamesObservable.next(this.games);
        }, 1000
    )
    this.dialogRef.close();
  };
}
