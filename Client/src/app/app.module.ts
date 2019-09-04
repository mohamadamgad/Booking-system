import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { BookingsComponent } from './Components/bookings/bookings.component';


import { AngularWebStorageModule } from 'angular-web-storage';
import {CalendarModule} from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularWebStorageModule,
    CalendarModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
