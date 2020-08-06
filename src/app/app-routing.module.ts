import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WriteMessageComponent } from './components/write-message-component/write-message.component';
import { GetLastMessagesComponent } from './components/get-last-messages-component/get-last-messages.component';
import { GetMessageComponent } from './components/get-message-component/get-message.component';

const routes: Routes = [
  {
    path: 'write-message',
    component: WriteMessageComponent
  },
  {
    path: 'get-last-messages',
    component: GetLastMessagesComponent
  },
  {
    path: 'get-message',
    component: GetMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
