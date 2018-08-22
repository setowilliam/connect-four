import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from "rxjs";
import { ChatWindowComponent } from './chat-window/chat-window.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: SocketIOClient.Socket;
  public getMessages: any;

  constructor() {
    this.getMessages = new Subject();
    this.socket = io.connect('https://mighty-spire-54148.herokuapp.com');
    this.socket.on('chat message', (msg) => {
      this.getMessages.next(msg);
    });
  }

  sendMessage(msg) {
    this.socket.emit('chat message', msg);
  }
}
