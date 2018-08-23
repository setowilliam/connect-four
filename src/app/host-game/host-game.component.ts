import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-host-game',
  templateUrl: './host-game.component.html',
  styleUrls: ['./host-game.component.css']
})
export class HostGameComponent implements OnInit {

  gameName: string;
  status: boolean = false;
  statusString: string = "Host Game";

  constructor(public chatService: ChatService) { }

  ngOnInit() {
  }

  hostGame() {
    if (this.status) {
      this.statusString = "host game";
      this.chatService.removeGame(this.gameName);
      this.gameName = "";
      this.status = !this.status;
    } else {
      if (this.gameName) {
        this.chatService.addGame(this.gameName);
        this.statusString = "cancel game";
        this.status = !this.status;
      }
    }
  }
}
