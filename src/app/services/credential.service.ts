import { HttpClient } from '@angular/common/http';
import { Credential } from 'src/app/module';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CredentialService {
    constructor(private http: HttpClient) {
    }

    register(credential: Credential): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(credential);
        return this.http.post(`${env.BASE_URL}/api/Account/Register`, body, { 'headers': headers });
    }

    getAccessToken(credential: Credential): Observable<any> {
        let body = new URLSearchParams();
        body.set('UserName', credential.Email);
        body.set('Password', credential.Password);
        body.set('grant_type', 'password');
        return this.http.post(`${env.BASE_URL}/token`, body)
    }
}