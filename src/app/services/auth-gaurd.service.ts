import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
    constructor() { }

    canActivate() {
        let access_token = localStorage.getItem('access_token');
        if (access_token)
            return true
        else
            return false
    }
}