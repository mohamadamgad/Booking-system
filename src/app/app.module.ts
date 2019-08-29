import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { BookingsComponent } from './Components/bookings/bookings.component';


import { AngularWebStorageModule } from 'angular-web-storage';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularWebStorageModule,
    DateRangePickerModule,
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
