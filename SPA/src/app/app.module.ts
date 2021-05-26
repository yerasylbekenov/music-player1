import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import {SharedService} from './shared.service';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: 'upload', component: UploadComponent}
];

@NgModule({
  declarations: [
    AppComponent,
      UploadComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
