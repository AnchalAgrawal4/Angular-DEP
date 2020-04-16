import { Component, Input } from '@angular/core';
import { User } from 'src/app/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  @Input() users: User[];
  @Input() showDetails: boolean;

  trackUsers(index: number, user: User): string {
    if (!user) {
      return null;
    }
    return user.id;
  }
}
