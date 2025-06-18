import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../user-service';
import { User } from '../user';

@Component({ selector: 'app-user-form',
  imports: [], templateUrl: './user-form.html',
  styleUrl: './user-form.css'})
export class UserForm {
  user:User;
  constructor( 
    private route:ActivatedRoute,
    private router:Router,
    private userService:UserService) {
    this.user = new User('', '', '');
  }
  onsubmit(){
    this.userService.save(this.user).subscribe(data => 
      this.gotoUserList());
    }
  gotoUserList() {
    this.router.navigate(['/users']);
  }

}
