import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { LocationService } from '../../Services/location.service';
import { Moment } from 'moment';

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
        this.getLocation();
    }

    public async getLocation() {
        const response = await this._locationService.getPosition();
        this.userCoordinates = response.lat + ',' + response.lng;
    }

    public datesSelected(event) {
        console.log('selected', event);
    }

    public onLoad(args: any) {
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }
}
