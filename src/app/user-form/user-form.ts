import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user-service';
import { Inject } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css'],
  standalone: true
})
export class UserForm {
  user: User;

  constructor(
    private router: Router,
    @Inject(UserService) private userService: UserService
  ) {
    this.user = new User('', '', '');
  }

  onSubmit() {
    this.userService.save(this.user).subscribe(result => {
      this.router.navigate(['/users']);
    });
  }
}
