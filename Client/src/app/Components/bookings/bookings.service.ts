import { Injectable } from '@angular/core';
import { RequestService } from '../../Services/request.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
    providedIn: 'root'
})
export class BookingsService {
    private readonly _rootUrl: string;
    private readonly _apiToken: string;
    private readonly _backEndUrl: string;

    constructor(
        private _requestService: RequestService,
        private _storageService: LocalStorageService
    ) {
        this._rootUrl = environment.placesApiUrl;
        this._apiToken = environment.apiToken;
        this._backEndUrl = environment.backendUrl;
    }

    public getProperties(url, header): Observable<any> {
        const fullUrl = this._rootUrl + url + this._apiToken;
        return this._requestService.get(fullUrl, header);
    }

    public getUser(userEmail,  header): Observable<any> {
        let url = this._backEndUrl + '/users/user/:email';
        url = url.replace(':email', userEmail);
        return this._requestService.get(url, header);
    }

    public addNewBooking(booking, header): Observable<any> {
        const url = this._backEndUrl + '/bookings';
        return this._requestService.post(url, booking, header);
    }

    public getBookingForProperty(propertyTitle,  header): Observable<any> {
        let url = this._backEndUrl + '/bookings/booking/getTitle/:title';
        url = url.replace(':title', propertyTitle);

        return this._requestService.get(url, header);
    }
}
