import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { LoginService } from './login.service';
import { Subscription } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public userName: String;
    public userEmail: String;
    private _loginSubscription: Subscription;
    public goToBooking: Boolean = false;

    constructor(
        private _router: Router,
        private _storageService: LocalStorageService,
        private _loginService: LoginService
    ) {}

    ngOnInit() {
        this._storageService.remove('userName');
    }

    public login() {
        this.goToBooking = false;
        const user = {
            name: this.userName,
            email: this.userEmail
        };
        const loginSubj = new Subject();
        this._loginSubscription = this._loginService
            .addNewUser('http://localhost:3000/users', user, {
                'Content-Type': 'application/json'
            })
            .subscribe((res: any) => {
                loginSubj.next(res);
            });

        this._storageService.set('userName', this.userName);
        this._storageService.set('userEmail', this.userEmail);

        loginSubj.subscribe( res => {
            this._router.navigate(['/booking']);
            }
        );


    }
}
