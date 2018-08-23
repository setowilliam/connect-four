import { Component, OnInit } from '@angular/core';
import { Grid } from '../models/grid';
import { Column } from '../models/column';
import { Cell } from '../models/cell';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  grid: Grid = new Grid;
  private numRows: number = 6;
  private numCols: number = 7;
  private player: string = "red";

  constructor(public chatService: ChatService) { }

  ngOnInit() {
    // this.grid.columns = [];
    // // Initialize grid model with empty cells
    // for (let i = 0; i < (this.numCols); i++) {
    //   let column = new Column;
    //   column.id = "column" + i;
    //   column.cells = [];
    //   column.count = 0;
    //   for (let k = 0; k < (this.numRows); k++) {
    //     let cell = new Cell;
    //     cell.id = k;
    //     cell.color = "none";
    //     cell.state = 0;
    //     column.cells.push(cell);
    //   }
    //   this.grid.columns.push(column);
    // }
  }

  changeState(column) {
    if (column < 6) {
      this.chatService.changeState(column);
      // column.cells[column.count].state = 1;
      // column.cells[column.count].color = this.player;
      // column.count++;
      // if (this.player == "red") {
      //   this.player = "yellow";
      // } else {
      //   this.player = "red";
      // }
    }
  }

  overColor(column) {
    if (column.count < 6) {
      column.cells[column.count].color = this.chatService.player;
    }
  }

  outColor(column) {
    if (column.count < 6) {
      column.cells[column.count].color = "none";
    }
  }
}
