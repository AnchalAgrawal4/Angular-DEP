import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersModule } from './shared/users.module';

const BASE_URL = 'http://localhost:8080';
const USERS_URL = `${BASE_URL}/users`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(USERS_URL);
  }

  getActiveUsers(): Observable<User[]> {
    return this.getUsers().pipe(
      map((users) => users.filter((user) => !user.isDeleted))
    );
  }

  getDeletedUsers(): Observable<User[]> {
    return this.getUsers().pipe(
      map((users) => users.filter((user) => user.isDeleted))
    );
  }

  getUserById(id: string) {
    return this.http.get<User>(`${USERS_URL}/${id}`);
  }

  createUser(user: User) {
    return this.http.post(USERS_URL, user);
  }

  updateUser(user: Partial<User>) {
    return this.http.put(`${USERS_URL}/${user.id}`, {
      password: user.password,
      age: user.age,
      isDeleted: user.isDeleted,
    });
  }

  activateUser(id: string) {
    return this.http.put(`${USERS_URL}/${id}`, {
      isDeleted: false,
    });
  }

  deActivateUser(id: string) {
    return this.http.put(`${USERS_URL}/${id}`, {
      isDeleted: true,
    });
  }
}

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  age: number;
  login: string;
  password: string;
  isDeleted?: boolean;
  updatedAt?: Date;
}
