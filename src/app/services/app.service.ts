import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Quote } from '../module';

@Injectable({ providedIn: 'root' })

export class AppService {
    constructor(private http: HttpClient) { }

    getAllQuote(): Observable<any> {
        return this.http.get<any>(`${env.BASE_URL}/api/Quote`)
    }

    getQuote(id: number): Observable<any> {
        return this.http.get<any>(`${env.BASE_URL}/api/Quote/${id}`)
    }

    addQuote(quote: Quote): Observable<any> {
        return this.http.post<any>(`${env.BASE_URL}/api/Quote/AddQuote`, quote);
    }

    removeQuote(id: number): Observable<any> {
        return this.http.delete<any>(`${env.BASE_URL}/api/Quote/${id}`);
    }

    updateQuote(quote: Quote): Observable<any> {
        return this.http.put<any>(`${env.BASE_URL}/api/Quote/${quote.QuoteID}`, quote);
    }
    // getAllQuote(access_token: string): Observable<any> {
    //     let header = new HttpHeaders().set("Authorization", `bearer ${access_token}`);
    //     return this.http.get(`${env.BASE_URL}/api/Quote`, { headers: header });
    // }

    // getQuote(access_token: string, id: number): Observable<any> {
    //     let header = new HttpHeaders().set("Authorization", `bearer ${access_token}`);
    //     return this.http.get(`${env.BASE_URL}/api/Quote/${id}`, { headers: header });
    // }

    // addQuote(access_token: string, quote: Quote): Observable<any> {
    //     let header = new HttpHeaders().set("Authorization", `bearer ${access_token}`);
    //     return this.http.post(`${env.BASE_URL}/api/Quote/AddQuote`, quote, { headers: header });
    // }

    // removeQuote(access_token: string, id: number): Observable<any> {
    //     let header = new HttpHeaders().set("Authorization", `bearer ${access_token}`);
    //     return this.http.delete(`${env.BASE_URL}/api/Quote/${id}`, { headers: header });
    // }

    // updateQuote(access_token: string, quote: Quote): Observable<any> {
    //     let header = new HttpHeaders().set("Authorization", `bearer ${access_token}`);
    //     return this.http.put(`${env.BASE_URL}/api/Quote/${quote.QuoteID}`, quote, { headers: header });
    // }
}