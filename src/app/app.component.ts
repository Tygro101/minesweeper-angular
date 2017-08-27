import { Component, Input } from '@angular/core';
import { Minesweeper } from './services/game.service';
declare var swal: any;

@Component({
  selector: 'game-window',
  templateUrl: './partials/app.component.html',
  styleUrls: ['./styles/app.component.css']
})
export class AppComponent {
  @Input() gameData:Minesweeper;
  alertHasShown:boolean;
  
  constructor(){
    this.alertHasShown = false;
  }
  public Reveal(event, cell){
    if(event.shiftKey){
      if(cell.isFlaged){
        cell.isFlaged = false;
        cell.isCovered = true;
        this.gameData.flags++;
        this.gameData.DeleteFlagedCell(cell);
      }
      else{
        if(this.gameData.flags===0){
          alert("You out of flags!");
        }else{
          this.gameData.AddFlagedCell(cell);
          cell.isCovered = false;
          cell.isFlaged = true;
          this.gameData.flags--;
          this.IsWon(this.gameData.flags);
        }
      }
    }else{
      //cell.isCovered = false;
      this.gameData.AutoExpand(cell);
    }

  }

  public IsEmpty(cell){
    if(cell.hasMine || cell.mineNumber>0 || (cell.isCovered && !cell.inSupermanMode) || cell.isFlaged){
      return false;
    }
    return true;
  }

  public ShowNumber(cell){
    if(cell.mineNumber>0 && !(cell.isCovered && !cell.inSupermanMode) && !cell.hasMine && !cell.isFlaged){
      return true;
    }
    return false;
  }


  public GetNumberPicture(cell){
    switch(cell.mineNumber){
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
  public GameOver(cell){
    if(cell.hasMine && !(cell.isCovered && !cell.inSupermanMode) && !cell.isFlaged){
      if(!cell.inSupermanMode){
        if(!this.alertHasShown){
          this.alertHasShown = true;
          swal({
            title:'Game Over!',
            type: 'error',
          }).then(this.ResetGame())
        }
      }
      return true;
    }
    return false;
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
