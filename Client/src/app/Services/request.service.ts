import { catchError, finalize, map, timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpClient
} from '@angular/common/http';
import { TimeoutError } from 'rxjs';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    private readonly _rootUrl: string;
    private readonly _apiToken: string;

    constructor(private _http: HttpClient) {
        this._rootUrl = environment.backendUrl;
        this._apiToken = environment.apiToken;
    }

    public get(url: string, headers: any = {}, responseType: any = 'json') {
        return this._http
            .get(url , { headers, responseType })
            .pipe(res => {
                return res;
            })
            .pipe(
                catchError(error => {
                    if (error instanceof TimeoutError) {
                        return throwError(new TimeoutError());
                    } else if (error.status === 401) {
                        return throwError(error);
                    }
                    return throwError(error);
                })
            );
    }

    public post(
        url: string,
        data: any,
        headers: any = {},
        responseType: any = 'json'
    ): Observable<any> {
        console.log('header', headers);
        console.log('data', data);
        return this._http
            .post(url, data, { headers, responseType })
            .pipe(
                map(item => {
                    JSON.stringify(item);
                    return item;
                })
            );
    }
}
