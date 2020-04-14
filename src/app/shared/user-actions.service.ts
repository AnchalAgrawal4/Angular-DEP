import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface UserAction {
  action: UserActionTypes;
  value: string;
}

export enum UserActionTypes {
  CREATE_USER = 'create-user',
  SHOW_DETAILS = 'show-details',
  EDIT_USER = 'edit-user',
  ACTIVATE_USER = 'activate-user',
  DEACTIVATE_USER = 'deactivate-user',
}

@Injectable({
  providedIn: 'root',
})
export class UserActionService {
  userAction$ = new Subject<UserAction>();

  onUserAction(action: UserAction) {
    this.userAction$.next(action);
  }
}
