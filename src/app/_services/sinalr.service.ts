import { Injectable, inject, signal } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { Client } from '../_models/client';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  hubUrl = environment.hubUrl;
  hubConnection?: HubConnection;
  orderSignal = signal<Client | null>(null);

  createHubConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        withCredentials: true
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .catch(error => console.log(error));

    this.hubConnection.on('OrderCompleteNotification', (order: Client) => {
      this.orderSignal.set(order)
    })
  }

  stopHubConnection() {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop().catch(error => console.log(error))
    }
  }
}
