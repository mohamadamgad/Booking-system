import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../../Services/request.service';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private readonly _backEndUrl: string;
    constructor(
        private _requestService: RequestService
    ) {
        this._backEndUrl = environment.backendUrl;
    }

    public addNewUser(user, header): Observable<any> {
        let url = this._backEndUrl;
        url = url + '/users';
        return this._requestService.post(url, user, header);
    }
}
