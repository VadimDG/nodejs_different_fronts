import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    private readonly basePath = 'http://localhost:3000';
    private readonly USERS_PATH = `${this.basePath}/users`;
    private readonly USER_PATH = `${this.basePath}/user`;

    constructor(private http: HttpClient) { }

    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.USERS_PATH);
    }

    public getUserById(id: string): Observable<User> {
        return this.http.get<User>(`${this.USER_PATH}/${id}`);
    }

    public addUser(user: User): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const requestOptions: Object = {
            headers: headers,
            responseType: 'text'
          }
        return this.http.post<any>(this.USER_PATH, JSON.stringify(user), requestOptions);
    }
}