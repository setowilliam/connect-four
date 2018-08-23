import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from "rxjs";
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { Router } from '@angular/router';
import { Grid } from './models/grid';
import { Column } from './models/column';
import { Cell } from './models/cell';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: SocketIOClient.Socket;
  public getMessages: any;
  public gameList: any[] = [];
  public userList: string[] = [];
  public grid: Grid = new Grid;
  currentGame: any;
  user: string;
  private numRows: number = 6;
  private numCols: number = 7;
  public player: string = "red";

  constructor(public dialog: MatDialog, public router: Router) {
    this.getMessages = new Subject();

    this.socket = io.connect('https://mighty-spire-54148.herokuapp.com');
    // this.socket = io.connect('localhost:8080');
    this.socket.on('chat message', (msg) => {
      this.getMessages.next(msg);
    });

    this.socket.on('add game', game => {
      this.gameList.push(game);
    })
    this.socket.on('remove game', gameName => {
      for (let i = 0; i < this.gameList.length; i++) {
        if (this.gameList[i].gameName == gameName) {
          this.gameList.splice(i, 1);
          break;
        }
      }
    })

    this.socket.on('connected user', (users, games) => {
      this.gameList = games;
      this.userList = users;
      this.openDialog();
    });

    this.socket.on('add user', user => {
      this.userList.push(user);
    });
    this.socket.on('remove user', user => {
      let index = this.userList.indexOf(user);
      if (index != -1) {
        this.userList.splice(index, 1);
      }
    })

    this.socket.on('start game', () => {
      this.grid.columns = [];
      // Initialize grid model with empty cells
      for (let i = 0; i < (this.numCols); i++) {
        let column = new Column;
        column.id = "column" + i;
        column.cells = [];
        column.count = 0;
        for (let k = 0; k < (this.numRows); k++) {
          let cell = new Cell;
          cell.id = k;
          cell.color = "none";
          cell.state = 0;
          column.cells.push(cell);
        }
        this.grid.columns.push(column);
      }

      for (let i = 0; i < this.gameList.length; i++) {
        if (this.gameList[i].hostPlayer == this.socket.id || this.gameList[i].player == this.socket.id) {
          this.currentGame = this.gameList[i];
        }
      }
      this.router.navigate(['/game']);
    })

    this.socket.on('change state', (column, count) => {
      this.grid.columns[column].cells[count - 1].state = 1;
      this.grid.columns[column].cells[count - 1].color = this.player;
      this.grid.columns[column].count++;
      if (this.player == "red") {
        this.player = "yellow";
      } else {
        this.player = "red";
      }
    })

    this.socket.on('update game', (game) => {
      for (let i = 0; i < this.gameList.length; i++) {
        if (this.gameList[i].gameName == game.gameName) {
          this.gameList[i] = game;
          break;
        }
      }
    })
  }

  sendMessage(msg) {
    this.socket.emit('chat message', msg);
  }

  setUserName(name) {
    this.socket.emit('username', name);
  }

  addGame(gameName) {
    this.socket.emit('add game', gameName);
  }

  removeGame(gameName) {
    this.socket.emit('remove game', gameName);
  }

  changeState(column) {
    this.socket.emit('change state', column, this.currentGame, this.player);
  }

  connectHost(hostPlayer, status) {
    if (this.socket.id != hostPlayer && status) {
      for (let i = 0; i < this.gameList.length; i++) {
        if (this.gameList[i].hostPlayer == hostPlayer) {
          this.gameList[i].player = this.socket.id;
          this.gameList[i].status = false;
          this.socket.emit('join game', this.gameList[i]);
        }
      }
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = { user: this.user };

    setTimeout(() => this.dialog.open(DialogComponent, dialogConfig).afterClosed().subscribe(result => {
      this.user = result;
      this.setUserName(this.user);
    }))
  }
}
