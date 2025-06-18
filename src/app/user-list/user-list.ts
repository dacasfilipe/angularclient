import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user-service';
@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList  implements OnInit{
  users!: User[];
  constructor(private userService:UserService) {    
  }
  ngOnInit() { //busca todas as entidades e armazena no users
    this.userService.findAll().subscribe(data => {
      this.users = data;
    });
  }
}
