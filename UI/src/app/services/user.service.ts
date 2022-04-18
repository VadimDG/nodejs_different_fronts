import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    private readonly basePath = 'http://localhost:3000';
    private readonly USERS_PATH = `${this.basePath}/users`;
    private readonly USER_BY_ID_PATH = `${this.basePath}/user`;

    constructor(private http: HttpClient) { }

    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.USERS_PATH);
    }

    public getUserById(id: string): Observable<User> {
        return this.http.get<User>(`${this.USER_BY_ID_PATH}/${id}`);
    }
}