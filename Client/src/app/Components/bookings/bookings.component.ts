import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { LocationService } from '../../Services/location.service';
import { BookingsService } from './bookings.service';
import {formatDate} from '@angular/common';


@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.component.html',
    styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
    public userName: String = '';
    public userCoordinates: String = '';
    public properties = [];
    public selectedDates: any;
    public user: any;
    public showDatesError: Boolean = false;

    constructor(
        private _storageService: LocalStorageService,
        private _locationService: LocationService,
        private _bookingsService: BookingsService
    ) {}

    ngOnInit() {
        this.userName = this._storageService.get('userName');
        this.getLocation();
        this.getUserByEmail();
    }

    public async getLocation() {
        const response = await this._locationService.getPosition();
        this.userCoordinates = response.lat + ',' + response.lng;
    }

    public datesSelected(event) {
        console.log('selected', event);
        console.log('selected type', typeof event);
        this.selectedDates = event;
    }

    public getUserByEmail() {
        const userEmail = this._storageService.get('userEmail');
        this._bookingsService.getUser('http://localhost:3000/users/user/:email', userEmail, {})
        .subscribe((res: any) => {
            console.log('userrrrr', res);
            this.user = res;
        });
    }

    public search() {
        this._bookingsService.getProperties(this.userCoordinates,
         {Accept: 'application/json' }).subscribe((res: any) => {
            this.properties = res.results.items;
            console.log('props', this.properties);
        });
    }

    public bookProperty(i) {
        console.log('title', this.properties[i].title);
        if (!this.selectedDates) {
            this.showDatesError = true;
            return;
        }
        const booking = {
            title: this.properties[i].title,
            startDate: formatDate(this.selectedDates.startDate, 'yyyy/MM/dd', 'en'),
            endDate: formatDate(this.selectedDates.endDate, 'yyyy/MM/dd', 'en'),
            user: this.user.id
        };
        console.log('BOOKING', booking);
        this._bookingsService
            .addNewBooking('http://localhost:3000/bookings', booking, {
                'Content-Type': 'application/json'
            })
            .subscribe((res: any) => {
               console.log('resss', res);
            });
        console.log('bopooking object', booking);
        console.log('selected dates', formatDate(this.selectedDates.startDate, 'yyyy/MM/dd', 'en'));
    }

    public onLoad(args: any) {
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }
}
