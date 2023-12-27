// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUsers() {
    // Replace this with actual user data retrieval logic
    return [
      { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      // Add more users as needed
    ];
  }
}
