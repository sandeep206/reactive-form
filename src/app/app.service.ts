import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './model/user';

@Injectable({ providedIn: 'root' })
export class AppService {
    constructor(private httpClient: HttpClient) {}

    public apiURI = 'https://demo-api.now.sh/users';
    public httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    public postUser(user: User): Observable<User> {
        const { password, ...newUser } = user;
        return this.httpClient.post<User>(
            this.apiURI,
            newUser,
            this.httpOptions
        );
    }
}
