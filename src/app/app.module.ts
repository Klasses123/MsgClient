import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WriteMessageComponent } from './components/write-message-component/write-message.component';
import { GetLastMessagesComponent } from './components/get-last-messages-component/get-last-messages.component';
import { GetMessageComponent } from './components/get-message-component/get-message.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WriteMessageComponent,
    GetLastMessagesComponent,
    GetMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
