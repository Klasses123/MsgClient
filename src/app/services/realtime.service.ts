import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionState } from '@microsoft/signalr';
import { from } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import MessageEventViewModel from '../models/message-event-viewmodel';
import { SignalRConfig, ConfigurationService } from './configuration.service';
import Message from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class RealtimeManagerService {
  connection: HubConnection;
  public messageEvent$: Subject<Message> = new Subject<Message>();

  constructor(
    configService: ConfigurationService
  ) {
    this.configureSignarR(configService.signalRconfig, configService.serverUrl);
  }

  private configureSignarR(
    signalConfig: SignalRConfig,
    serverUrl: string
  ): void {
    this.connection = new signalR.HubConnectionBuilder()
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          if (
            retryContext.elapsedMilliseconds <
            signalConfig.frequentReconnectTimeout
          ) {
            // If we've been reconnecting for less than 60 seconds so far,
            // wait 500 ms before the next reconnect attempt.
            return 500;
          } else if (
            retryContext.elapsedMilliseconds < signalConfig.lazyReconnectTimeout
          ) {
            // try reconnect every 5-15 seconds
            return 5 * 1000 + Math.random() * 10000;
          } else {
            // once a minute
            return 60 * 1000;
          }
        }
      })
      .withUrl(serverUrl + signalConfig.signalRhubUrl)
      //.configureLogging(signalR.LogLevel.Information)
      .build();
    this.connection.on('MessageEvent', (message: MessageEventViewModel) => {
      console.log(message);
      this.messageEvent$.next(message.data);
    });
    this.startConnection();
  }

  public startConnection(): Observable<void> {
    console.log('started connection');
    console.log(this.connection.state);
    if (this.connection.state == HubConnectionState.Disconnected) {
      return from(
        this.connection.start().catch((err) => {
          console.error(err);
        })
      );
    }
  }

  public closeConnection(): Observable<void> {
    return from(this.connection.stop());
  }

  sendMessage(newMesReq: Message): void {
    this.connectionInvoke('new-message', newMesReq);
  }

  private connectionInvoke(
    methodName: string,
    request: Message
  ): void {
    const invoke = (): void => {
      this.connection
        .invoke(methodName, request)
        .then((e) => {})
        .catch((e) => console.log(e));
    };

    if (this.connection.state !== HubConnectionState.Connected) {
      this.startConnection().subscribe(() => {
        invoke();
      });
    } else {
      invoke();
    }
  }
}
