import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string;
  // Mock data for development if backend is not available
  private mockUsers: User[] = [
    new User('John Doe', 'john@example.com', '1'),
    new User('Jane Smith', 'jane@example.com', '2')
  ];
  private useMockData: boolean = true; // Set to false when real backend is available

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/api/users';
  }

  public findAll(): Observable<User[]> {
    if (this.useMockData) {
      console.log('Using mock data since backend is not available');
      return of(this.mockUsers);
    }
    
    return this.http.get<User[]>(this.usersUrl).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        return of(this.mockUsers);
      })
    );
  }

  public save(user: User): Observable<User> {
    if (this.useMockData) {
      console.log('Simulating save with mock data');
      const newUser = new User(user.name, user.email, (this.mockUsers.length + 1).toString());
      this.mockUsers.push(newUser);
      return of(newUser);
    }
    
    return this.http.post<User>(this.usersUrl, user).pipe(
      catchError(error => {
        console.error('Error saving user:', error);
        return of(user);
      })
    );
  }

  public delete(id: string): Observable<void> {
    if (this.useMockData) {
      console.log(`Simulating delete for user with id: ${id}`);
      this.mockUsers = this.mockUsers.filter(user => user.id !== id);
      return of(undefined);
    }

    return this.http.delete<void>(`${this.usersUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting user with id ${id}:`, error);
        return of(undefined);
      })
    );
  }

  public findById(id: string): Observable<User> {
    if (this.useMockData) {
      const foundUser = this.mockUsers.find(user => user.id === id);
      if (foundUser) {
        return of(foundUser);
      }
      console.error(`User with id ${id} not found in mock data`);
      return of(new User('', '', ''));
    }

    return this.http.get<User>(`${this.usersUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching user with id ${id}:`, error);
        return of(new User('', '', ''));
      })
    );
  }

  public update(user: User): Observable<User> {
    if (this.useMockData) {
      console.log(`Simulating update for user with id: ${user.id}`);
      const index = this.mockUsers.findIndex(u => u.id === user.id);
      if (index !== -1) {
        this.mockUsers[index] = user;
      }
      return of(user);
    }

    return this.http.put<User>(`${this.usersUrl}/${user.id}`, user).pipe(
      catchError(error => {
        console.error(`Error updating user:`, error);
        return of(user);
      })
    );
  }
}
