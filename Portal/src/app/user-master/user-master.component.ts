import { Component } from '@angular/core';
import { UserService } from '../UserService';
@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  editUser(user: any) {
    // Implement edit functionality
    console.log('Edit user:', user);
  }

  deleteUser(user: any) {
    // Implement delete functionality
    console.log('Delete user:', user);
  }
}
