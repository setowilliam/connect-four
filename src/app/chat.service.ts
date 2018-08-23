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
  public connectedUsers: string[];
  user: string;

  constructor(public dialog: MatDialog) {
    this.getMessages = new Subject();
    this.socket = io.connect('https://mighty-spire-54148.herokuapp.com');
    this.socket.on('chat message', (msg) => {
      this.getMessages.next(msg);
    });

    this.socket.on('all connected users', data => {
      this.connectedUsers = data;
      this.openDialog();
    });
    this.socket.on('connected user', userName => {
      this.connectedUsers.push(userName);
    });
    this.socket.on('disconnected user', userName => {
      this.connectedUsers.splice(this.connectedUsers.indexOf(userName), 1);
    })
  }

  sendMessage(msg) {
    this.socket.emit('chat message', msg);
  }

  setUserName(name) {
    this.socket.emit('username', name);
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
