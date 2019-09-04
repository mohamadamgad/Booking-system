import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { LocationService } from '../../Services/location.service';
import { BookingsService } from './bookings.service';
import {formatDate} from '@angular/common';
import {MessageService} from 'primeng/api';


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
    public rangeDates: Date[];
    public invalidDates: Date[] = [];

    constructor(
        private _storageService: LocalStorageService,
        private _locationService: LocationService,
        private _bookingsService: BookingsService,
        private _messageService: MessageService
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
    public async checkDates(i) {
        const datesForProperty = await this._bookingsService.getBookingForProperty(this.properties[i].title, {}).toPromise();
    }

    public getPropertyBooking() {

    }

    public async getUserByEmail() {
        const userEmail = this._storageService.get('userEmail');
        this.user = await this._bookingsService.getUser(userEmail, {})
        .toPromise();
    }

    public async search() {
        const res = await this._bookingsService.getProperties(this.userCoordinates, {Accept: 'application/json' }).toPromise();
        this.properties = res.results.items;
    }

    public async bookProperty(i) {

        const booking = {
            title: this.properties[i].title,
            startDate: formatDate(this.rangeDates[0], 'yyyy/MM/dd', 'en'),
            endDate: formatDate(this.rangeDates[1], 'yyyy/MM/dd', 'en'),
            user: this.user.id
        };
        await this._bookingsService
            .addNewBooking(booking, {
                'Content-Type': 'application/json'
            }).toPromise();

            this._messageService.add({
                key: 'bookingSuccess',
                sticky: true,
                severity: 'success',
                summary: 'Property Booked Successfully!'
            });

    }
}
