import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from 'src/app/services/configuration.service';
import Message from 'src/app/models/message';

@Component({
  selector: 'get-last-messages',
  templateUrl: 'get-last-messages.component.html'
})

export class GetLastMessagesComponent implements OnInit {
  constructor(
    private configService: ConfigurationService,
    private httpClient: HttpClient
  ) { }
  
  ngOnInit(): void { }

  getMessages(): void {
    this.httpClient.get<Message[]>(`${this.configService.webApiUrl}/message/allForLastTenMin`)
    .subscribe(res => {
      console.log(res);
    }), (error) => {
      console.log(error);
    }
  }
}