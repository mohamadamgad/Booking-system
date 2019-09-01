import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../../Services/request.service';


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(
        private _requestService: RequestService
    ) {}

    public addNewUser(url, user, header): Observable<any> {
        return this._requestService.post(url, user, header);
    }
}
