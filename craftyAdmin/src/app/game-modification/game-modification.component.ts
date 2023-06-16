import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-game-modification',
  templateUrl: './game-modification.component.html',
  styleUrls: ['./game-modification.component.scss']
})
export class GameModificationComponent {
  constructor(private service: DataService){}
}
