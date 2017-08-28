import { Component , Input } from '@angular/core';
import { Minesweeper } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './partials/app.component.top.html',
  styleUrls:['./styles/app.component.top.css']
})
export class AppComponentTop {
    public gameItem:Minesweeper;
    width:number;
    height:number;
    mines:number;
    isSuperman:boolean;

    constructor(){
        this.width = 10;
        this.height = 10;
        this.mines = 8;
        this.isSuperman= false;
        this.gameItem = new Minesweeper(this.width,this.height,this.mines,false);
    }

    public Start(){
        if(this.mines<0)
            this.mines = 0;
        if(this.height < 1){
            this.height = 5; // default value 5
        }
        if(this.width < 1){
            this.width = 1; // default value 5
        }
        if(this.mines>this.width*this.height){
            this.mines = this.width*this.height;
        }
        this.gameItem = new Minesweeper(this.width,this.height,this.mines, this.isSuperman);
    }

    CheckWidth(){
        if(this.width >300){
            this.width = 300;
        }
    }

    CheckHeight(){
        if(this.height >300){
            this.height = 300;
        }
    }

    CheckMines(){
        if(this.mines>this.width*this.height){
            this.mines = this.width*this.height;
        }
    }

    SupermanMode(event){
        this.gameItem.SupermanMode(event.target.checked)
    }
}