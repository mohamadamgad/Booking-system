import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { BookingsComponent } from './Components/bookings/bookings.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'booking', component: BookingsComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
