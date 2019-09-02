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

    constructor(
        private _requestService: RequestService,
        private _storageService: LocalStorageService
    ) {
        this._rootUrl = environment.backendUrl;
        this._apiToken = environment.apiToken;
    }

    public getProperties(url, header): Observable<any> {
        const fullUrl = this._rootUrl + url + this._apiToken;
        return this._requestService.get(fullUrl, header);
    }

    public getUser(url, header): Observable<any> {
        const userEmail = this._storageService.get('userEmail');
        const userUrl = url.replace(':email', userEmail);
        return this._requestService.get(userUrl, header);
    }
}
