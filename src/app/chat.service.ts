import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from "rxjs";
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: SocketIOClient.Socket;
  public getMessages: any;
  public getAddGame: any;
  public getRemoveGame: any;
  public getAddUser: any;
  public getRemoveUser: any;
  public gameList: string[] = [];
  public userList: string[] = [];
  user: string;

  constructor(public dialog: MatDialog) {
    this.getMessages = new Subject();
    this.getAddGame = new Subject();
    this.getRemoveGame = new Subject();
    this.getAddUser = new Subject();
    this.getRemoveUser = new Subject();

    this.socket = io.connect('https://mighty-spire-54148.herokuapp.com');

    this.socket.on('chat message', (msg) => {
      this.getMessages.next(msg);
    });

    this.socket.on('add game', game => {
      this.gameList.push(game);
    })
    this.socket.on('remove game', game => {
      let index = this.gameList.indexOf(game);
      if (index != -1) {
        this.gameList.splice(index, 1);
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
