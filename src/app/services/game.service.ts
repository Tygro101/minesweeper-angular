export class Minesweeper{
    public Rows:Array<Row>;
    public FlagedCells:Array<Cell>;
    public flags:number;
    public inSupermanMode;
    //private inSupermanMode:boolean;
    public width:number;
    public hight:number;
    mines:number;
    
 


    public constructor(width:number , hight:number, mines:number, inSupermanMode:boolean = false){
        this.width = width-1;
        this.hight = hight-1;
        this.mines = mines;
        this.inSupermanMode = inSupermanMode;
        this.SetupBoard(inSupermanMode);
    }

    public SupermanMode(inSupermanMode:boolean){
        this.inSupermanMode = inSupermanMode;
    }

    private SetupBoard(inSupermanMode:boolean = false){
        this.flags = this.mines;
        this.Rows = new Array<Row>();
        this.FlagedCells = new Array<Cell>();
        this.FlagedCells = new Array<Cell>();
        for(var i = 0; i<=this.hight ; i++){
            var row = new Row();
            for(var j = 0 ; j <= this.width; j++){
                row.AddCell(new Cell(i, j));
            }
            this.Rows.push(row);
        }
        this.SetMines(this.mines);
        this.SetNumbers(); 
    }

    public ResetGame(){
        this.SetupBoard()
    }

    public AddFlagedCell(cell){
        this.FlagedCells.push(cell);
    }

    public DeleteFlagedCell(cell){
        for(var i = 0; i<this.FlagedCells.length; i++){
            if(this.FlagedCells[i].row === cell.row && this.FlagedCells[i].column === cell.column){
                this.FlagedCells.splice(i, 1);
            }
        }
    }

    public IsWon(){
        for(var i = 0; i< this.FlagedCells.length; i++){
            if(!this.FlagedCells[i].hasMine)
                return false;
        }
        return true;
    }

    private GetCell(row:number, column:number){
        if(row < this.Rows.length){
            return this.Rows[row].GetCell(column);
        }
    }


    private SetMines(mines){
        while(mines>0){
            var cell = this.GetCell(Math.round(Math.random() * this.hight),Math.round(Math.random() * this.width));
            if(!cell.hasMine){
                cell.hasMine = true;
                mines+=-1;
            }
        }
    }

    private SetNumbers(): void {
        for (let row = 0; row <= this.hight; row++) {
            for (let column = 0; column <= this.width; column++) { 
                let number = 0;
                if (row !== 0) {                    // if is not in first row
                    if (this.GetCell(row-1,column).hasMine) {
                        number++;
                    }
                }
                if (row !== this.hight) {       // if is not in last row
                    if (this.GetCell(row+1,column).hasMine) {
                        number++;
                    }
                }


                if (column !== 0) { // if is not in first col
                    if (this.GetCell(row,column-1).hasMine) {
                        number++;
                    }
                }
                if (column !== this.width) { // if is not in last col
                    if (this.GetCell(row,column+1).hasMine) {
                        number++;
                    }
                }

                if (column !== this.width && row !== this.hight) {
                    if (this.GetCell(row+1,column+1).hasMine) {
                        number++;
                    }
                }
                if (column !== 0 &&  row !== 0) {
                    if (this.GetCell(row-1,column-1).hasMine) {
                        number++;
                    }
                }
                if (column !== this.width && row !== 0) {
                    if (this.GetCell(row-1,column+1).hasMine) {
                        number++;
                    }
                }
                if (column !== 0 &&  row !== this.hight) {
                    if (this.GetCell(row+1,column-1).hasMine) {
                        number++;
                    }
                }
                this.GetCell(row,column).mineNumber = number;
            }
        }
    }

    public AutoExpand(cell): void {
        if (cell.isCovered){
            cell.isCovered = false;
            if(!cell.hasMine && cell.mineNumber === 0) {
                if (cell.row + 1 <= this.hight) { // it is not last in cell.row, so i can chcek next bombBox
                    this.AutoExpand(this.GetCell(cell.row + 1, cell.column));
                }
                if (cell.column + 1 <= this.width) { // it is not last in col
                    this.AutoExpand(this.GetCell(cell.row, cell.column + 1));
                }
                if (cell.row - 1 >= 0) { // it is not first in cell.row
                    this.AutoExpand(this.GetCell(cell.row - 1, cell.column));
                }
                if (cell.column - 1 >= 0) { // it is not first in col
                    this.AutoExpand(this.GetCell(cell.row, cell.column - 1));
                }
            
            }
        }
    }

}



class Row{
    public Cells: Array<Cell>;

    public constructor(){
        this.Cells = new Array<Cell>();
    }

    public AddCell(cell:Cell){
        this.Cells.push(cell);
    }

    public GetCell(column){
        if(column < this.Cells.length){
            return this.Cells[column];
        }
    }

}


class Cell{
    public row:number;
    public column:number;
    public isCovered:boolean;
    public hasMine:boolean;
    public mineNumber:number;
    public isFlaged:boolean;
    public constructor(row:number, column:number){
        this.isCovered = true;
        this.hasMine =  false;
        this.isFlaged = false;
        this.mineNumber = 0;
        this.row = row;
        this.column = column;
    }
}