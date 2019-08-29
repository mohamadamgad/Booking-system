import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  constructor(private _storageService: LocalStorageService) { }

  ngOnInit() {
    console.log('this.username', this._storageService.get('userName'));
  }

}
