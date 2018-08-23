import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  getMessagesSub: any;
  messages: any[] = [];
  currentMessage: string;

  constructor(public chatService: ChatService) {}

  ngOnInit() {
    this.getMessagesSub = this.chatService.getMessages.subscribe((data) => {
      let msg = JSON.parse(data);
      msg.id = "msg" + this.messages.length;
      this.messages.push(msg);
    });
  }

  sendMessage() {
    if (this.currentMessage) {
      this.chatService.sendMessage(this.currentMessage);
      this.currentMessage = "";
    }
  }

  autoGrow(id) {
    let msg = document.getElementById(id);
    msg.style.height = '5px';
    msg.style.height = msg.scrollHeight + 'px';
    let chat = document.getElementById("chat");
    chat.scrollTop = chat.scrollHeight;
  }



  ngOnDestroy() {
    if (this.getMessagesSub) {
      this.getMessagesSub.unsubscribe();
    }
  }

}