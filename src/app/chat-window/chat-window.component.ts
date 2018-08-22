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
      this.messages.unshift(JSON.parse(data));
    });
  }

  sendMessage() {
    if (this.currentMessage) {
      let temp = new Promise((res, rej) => {
        this.chatService.sendMessage(this.currentMessage);
        res();
      });
      temp.then(() => {
        this.autoGrow();
        this.currentMessage = "";
      }).catch(() => {
        console.log("Something went wrong")
      })
    }
  }

  autoGrow() {
    let msg = document.querySelectorAll('.message') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < msg.length; i++) {
      msg[i].style.height = '5px';
      msg[i].style.height = msg[i].scrollHeight + 'px';
    }
  }

  ngOnDestroy() {
    if (this.getMessagesSub) {
      this.getMessagesSub.unsubscribe();
    }
  }

}
