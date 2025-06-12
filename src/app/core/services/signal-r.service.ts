import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private options: signalR.IHttpConnectionOptions = {
    transport: signalR.HttpTransportType.ServerSentEvents,
    logger: signalR.LogLevel.Trace,
  };

  private hubConnection: signalR.HubConnection =
    new signalR.HubConnectionBuilder()
      .withUrl(
        `${environment.apiBaseUrl}/${environment.signalRUrl}`,
        this.options
      )
      .withAutomaticReconnect()
      .build();

  public connect(): void {
    this.hubConnection
      .start()
      .then(() => {
        // Here goes all declarations.
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public disconnect(): void {
    this.hubConnection.stop();
  }
}
