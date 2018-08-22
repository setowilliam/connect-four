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

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.getMessagesSub = this.chatService.getMessages.subscribe((data) => {
      let msg = JSON.parse(data);
      msg.id = "msg" + this.messages.length;
      this.messages.unshift(msg);
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
  }

  toggleState() {

  }
  ngOnDestroy() {
    if (this.getMessagesSub) {
      this.getMessagesSub.unsubscribe();
    }
  }

}
