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
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import {CalendarModule} from 'primeng/calendar';




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
    DateRangePickerModule,
    CalendarModule,
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
