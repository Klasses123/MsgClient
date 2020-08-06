import { Component, OnInit } from '@angular/core';
import { RealtimeManagerService } from 'src/app/services/realtime.service';
import Message from 'src/app/models/message';

@Component({
  selector: 'get-message',
  templateUrl: 'get-message.component.html'
})

export class GetMessageComponent implements OnInit {

  messages: Message[] = [];

  constructor(
    private realtimeService: RealtimeManagerService
  ) { }

  ngOnInit() {
    this.realtimeService.messageEvent$.subscribe(msg => {
      this.messages.push(msg);
    })
  }
}