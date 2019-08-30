import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    constructor() {}

    public getPosition(): Promise<any> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.watchPosition(
                resp => {
                    resolve({
                        lng: resp.coords.longitude,
                        lat: resp.coords.latitude
                    });
                },
                err => {
                    console.log('error', err);
                    reject(err);
                }
            );
        });
    }
}
