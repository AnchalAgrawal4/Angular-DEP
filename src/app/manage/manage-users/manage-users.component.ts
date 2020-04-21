import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/app/user.service';
import { Router } from '@angular/router';
import {
  UserActionService,
  UserActionTypes,
} from 'src/app/shared/user-actions.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  userList: User[] = [];
  constructor(
    private userService: UserService,
    private router: Router,
    private userActionService: UserActionService
  ) {}

  ngOnInit(): void {
    this.loadAllUsers();
    this.userActionService.userAction$.subscribe(({ action, value }) => {
      switch (action) {
        case UserActionTypes.SHOW_DETAILS:
          this.showUserDetails(value);
          break;
        case UserActionTypes.EDIT_USER:
          this.editUserDetails(value);
          break;
        case UserActionTypes.CREATE_USER_SUCCESS:
        case UserActionTypes.EDIT_USER_SUCCESS:
          this.router.navigateByUrl('/user');
          this.loadAllUsers();
          break;
      }
    });
  }

  loadAllUsers(): void {
    this.userService
      .getUsers()
      .pipe(
        map((users: User[]) => {
          return users.sort((u1, u2) => {
            const d1 = new Date(u1.updatedAt).getTime();
            const d2 = new Date(u2.updatedAt).getTime();
            return d2 - d1;
          });
        })
      )
      .subscribe((result) => {
        this.userList = result;
      });
  }

  createNewUser(): void {
    this.router.navigateByUrl('/user/create');
  }

  showUserDetails(id: string): void {
    this.router.navigateByUrl(`/user/${id}`);
  }

  editUserDetails(id: string): void {
    this.router.navigateByUrl(`/user/edit/${id}`);
  }
}
