import { ChatService } from '../chat.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.css']
})
export class ChatUsersComponent implements OnInit {

  constructor(public chatService: ChatService) { }

  ngOnInit() {
  }

}
