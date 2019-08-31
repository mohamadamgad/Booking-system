import { Injectable } from '@angular/core';
import { RequestService } from '../../Services/request.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BookingsService {
    constructor(private _requestService: RequestService) {}

    public getProperties(url, header): Observable<any> {
        return this._requestService.get(url, header);
    }
}
