import { Component, OnInit } from '@angular/core';
import { RealtimeManagerService } from 'src/app/services/realtime.service';
import Message from 'src/app/models/message';

@Component({
  selector: 'write-message',
  templateUrl: 'write-message.component.html'
})

export class WriteMessageComponent implements OnInit {

  messageText: string;
  number: number = 0;

  constructor(
    private realtimeService: RealtimeManagerService
  ) { 
    realtimeService.startConnection();
  }

  send(): void {
    const msg = new Message();
    msg.text = this.messageText;
    msg.number = this.number;
    this.realtimeService.sendMessage(msg);
  }

  ngOnInit(): void { }

}