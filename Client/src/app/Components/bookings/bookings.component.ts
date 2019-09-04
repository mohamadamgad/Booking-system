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
    public rangeDates: Date[];
    public invalidDates: Date[] = [];

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

    public datesSelected() {
        console.log('dattetetetet', this.rangeDates);
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
        console.log('this.properties', this.properties);
    }

    public async bookProperty(i) {
        // if (!this.selectedDates) {
        //     this.showDatesError = true;
        //     return;
        // }

        console.log('start', this.rangeDates[0]);
        console.log('end', this.rangeDates[1]);

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

    }

    public onLoad(args: any) {
        console.log('args', args.date);
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }
}
