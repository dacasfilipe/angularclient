import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl:string;

  constructor(private http:HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
   }
  //encontrar todos os usuarios
  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }
  //salvar o usuario
  public save(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }

}
