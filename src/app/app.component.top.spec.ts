import {AppComponentTop } from './app.component.top'
import { async } from '@angular/core/testing';

describe('AppComponentTop', ()=>{
    let app: AppComponentTop;

    beforeEach(()=> {
        app = new AppComponentTop();
    })

    it('should create a default game object', async(()=>{
        expect(app.gameItem).not.toBeNull();
    }));


    it('rows count should be queal to height',  async(() => {
        expect(app.gameItem.Rows.length-1).toBe(app.gameItem.height);
    }));
    
    it('column count should be queal to width',  async(() => {
        expect(app.gameItem.Rows[0].Cells.length-1).toBe(app.gameItem.width);
    }));


    it('flags count should be queal to mines',  async(() => {
        expect(app.gameItem.flags).toBe(app.gameItem.mines);
    }));
  
    it('sumulate a win, and check results',  async(() => {
        for(var row = 0; row< app.height; row++){ //rows
            for(var column = 0 ; column<app.width; column++){ //coulums
                if(app.gameItem.Rows[row].Cells[column].hasMine)
                    app.gameItem.AddFlagedCell(app.gameItem.Rows[row].Cells[column]);
            }
        }
        expect(app.gameItem.IsWon()).toBe(true);
    }));
    
    it('create new game, new check all the previous tests in one',  async(() => {
        app.width = 15;
        app.height = 12;
        app.mines = 17;
        app.Start();
        expect(app.gameItem).not.toBeNull();
        expect(app.gameItem.flags).toBe(app.gameItem.mines);
        expect(app.gameItem.Rows[0].Cells.length-1).toBe(app.gameItem.width);
        expect(app.gameItem.Rows.length-1).toBe(app.gameItem.height);
        for(var row = 0; row< app.height; row++){ //rows
            for(var column = 0 ; column<app.width; column++){ //coulums
                if(app.gameItem.Rows[row].Cells[column].hasMine)
                    app.gameItem.AddFlagedCell(app.gameItem.Rows[row].Cells[column]);
            }
        }
        expect(app.gameItem.IsWon()).toBe(true);
    }));
      
})