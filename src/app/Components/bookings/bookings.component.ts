import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { LocationService } from '../../Services/location.service';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.component.html',
    styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
    public userName: String = '';
    public userCoordinates: String = '';

    constructor(
        private _storageService: LocalStorageService,
        private _locationService: LocationService
    ) {}

    ngOnInit() {
        this.userName = this._storageService.get('userName');

        this._locationService.getPosition().then(pos => {
            this.userCoordinates = pos.lat + ',' + pos.lng;
        });
    }
}
