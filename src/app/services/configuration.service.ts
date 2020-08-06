import { Injectable } from '@angular/core';

export class SignalRConfig {
  readonly signalRhubUrl: string = '/hub/chat';
  readonly frequentReconnectTimeout: number = 10 * 1000; //seconds
  readonly lazyReconnectTimeout: number = 10 * 60 * 1000; //seconds
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  readonly serverUrl: string = 'https://localhost:44321';
  readonly signalRconfig: SignalRConfig = new SignalRConfig();
  readonly webApiUrl: string;
  constructor(){
    this.webApiUrl = this.serverUrl + '/api';
  }
}