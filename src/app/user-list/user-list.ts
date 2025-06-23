import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user-service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  imports: [CommonModule, RouterLink],
  standalone: true
})
export class UserList implements OnInit {
  users: User[] = [];
  errorMessage: string = '';
  loading: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loading = true;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.findAll().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load users. Using mock data instead.';
        this.loading = false;
        console.error('Error loading users', error);
      }
    });
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.delete(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}
