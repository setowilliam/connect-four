import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(public chatService: ChatService, public router: Router) { }

  ngOnInit() {
    if (!this.chatService.user) {
      this.router.navigate(['/lobby']);
    }
  }

}
