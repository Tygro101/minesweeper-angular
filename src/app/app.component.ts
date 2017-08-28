import { Component, Input } from '@angular/core';
import { Minesweeper } from './services/game.service';
declare var swal: any;

@Component({
  selector: 'game-window',
  templateUrl: './partials/app.component.html',
  styleUrls:  ['./styles/app.component.css']
})
export class AppComponent {
  @Input() gameData:Minesweeper;
  alertHasShown:boolean;
  
  constructor(){
    this.alertHasShown = false;
  }

  public getCoveredImg(cell){
    if(this.gameData.inSupermanMode){
      return "assets/covered-semi-transparent.png"
    }
    return "assets/covered.png"
  }

  public getPicture(cell){
    if(cell.hasMine)
      return "assets/mine.png";
    return this.GetNumberPicture(cell);

  }

  public Reveal(event, cell){
    if(event.shiftKey){
      this.AddRemoveFlag(cell);
    }else{
      if(cell.isFlaged){
        return;
      }
      if(cell.hasMine)
        swal({
          title:'Game Over!',
          type: 'error',
        }).then(this.ResetGame());
      this.gameData.AutoExpand(cell);
    }

  }

  public AddRemoveFlag(cell){
    if(cell.isFlaged){
      cell.isFlaged = false;
      this.gameData.flags++;
      this.gameData.DeleteFlagedCell(cell);
    }
    else{
      if(this.gameData.flags===0){
        alert("You out of flags!");
      }else{
        this.gameData.AddFlagedCell(cell);
        cell.isFlaged = true;
        this.gameData.flags--;
        this.IsWon(this.gameData.flags);
      }
    }
  }

  public GetNumberPicture(cell){
    switch(cell.mineNumber){
      case 0:
        return "assets/empty.png"
      case 1:
        return "assets/number-1.png"
      case 2:
        return "assets/number-2.png"
      case 3:
        return "assets/number-3.png"
      case 4:
        return "assets/number-4.png"
      case 5:
        return "assets/number-5.png"
      case 6:
        return "assets/number-6.png"
      case 7:
        return "assets/number-7.png"      
      case 8:
        return "assets/number-8.png"            
    }
  }

  private IsWon(flags){
    if(flags === 0){
      if(this.gameData.IsWon()){
        if(!this.alertHasShown){
          this.alertHasShown = true;
          swal({
            title:'You Won!!',
            type: 'success',
          }).then(this.ResetGame())
        }
      }
    }
  }

  private ResetGame(){
    this.gameData.ResetGame();
    this.alertHasShown = false;
    
  }
}
