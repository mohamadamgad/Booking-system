import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { LocationService } from '../../Services/location.service';
import { BookingsService } from './bookings.service';


@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.component.html',
    styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
    public userName: String = '';
    public userCoordinates: String = '';
    public properties = [];

    constructor(
        private _storageService: LocalStorageService,
        private _locationService: LocationService,
        private _bookingsService: BookingsService
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

    public search() {
        this._bookingsService.getProperties(this.userCoordinates,
         {Accept: 'application/json' }).subscribe((res: any) => {
            this.properties = res.results.items;
            console.log('props', this.properties);
        });
    }

    public onLoad(args: any) {
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }
}
