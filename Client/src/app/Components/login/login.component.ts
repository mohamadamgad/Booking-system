import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { LoginService } from './login.service';
import { Subject } from 'rxjs';
import { BookingsService } from '../bookings/bookings.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public userName: String;
    public userEmail: String;
    public goToBooking: Boolean = false;
    public user: any;
    public loginSubj = new Subject();


    constructor(
        private _router: Router,
        private _storageService: LocalStorageService,
        private _loginService: LoginService,
        private _bookingService: BookingsService
    ) {}

    ngOnInit() {
        this._storageService.remove('userName');
        this._storageService.remove('userEmail');
    }

    public async login() {
        this.goToBooking = false;
        const user = {
            name: this.userName,
            email: this.userEmail
        };
        const checkSub = new Subject();
        this.user = await this._bookingService.getUser(this.userEmail, {})
        .toPromise();

        if (!this.user) {
            await this._loginService
                .addNewUser(user, {'Content-Type': 'application/json'}).toPromise();
                this._router.navigate(['/booking']);

        } else {
            this._router.navigate(['/booking']);
        }

        this._storageService.set('userName', this.userName);
        this._storageService.set('userEmail', this.userEmail);


    }
}
