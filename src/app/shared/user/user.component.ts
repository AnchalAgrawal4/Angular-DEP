import { Component, Input } from '@angular/core';
import { User } from 'src/app/user.service';
import { UserActionService, UserActionTypes } from '../user-actions.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  @Input() user: User;
  @Input() showDetails: boolean;

  constructor(private userActionService: UserActionService) {}

  onUserStatusChange() {
    const action = this.user.isDeleted
      ? UserActionTypes.ACTIVATE_USER
      : UserActionTypes.DEACTIVATE_USER;
    this.userActionService.onUserAction({
      action,
      value: this.user.id,
    });
  }

  onUserShowDetails() {
    this.userActionService.onUserAction({
      action: UserActionTypes.SHOW_DETAILS,
      value: this.user.id,
    });
  }

  onUserEditDetails() {
    this.userActionService.onUserAction({
      action: UserActionTypes.EDIT_USER,
      value: this.user.id,
    });
  }
}
