import { Component, Input } from '@angular/core';
import { Minesweeper } from './services/game.service';

@Component({
  selector: 'game-window',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() gameData:Minesweeper;
  title = 'Test1';
}
