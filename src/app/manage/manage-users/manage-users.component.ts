import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/app/user.service';
import { Router } from '@angular/router';
import {
  UserActionService,
  UserActionTypes,
} from 'src/app/shared/user-actions.service';

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
    this.loadUsers();
    this.userActionService.userAction$.subscribe(({ action, value }) => {
      switch (action) {
        case UserActionTypes.SHOW_DETAILS:
          this.showUserDetails(value);
          break;
        case UserActionTypes.EDIT_USER:
          this.editUserDetails(value);
          break;
      }
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe((result) => {
      this.userList = result;
    });
  }

  createNewUser() {
    this.router.navigateByUrl('/user/create');
  }

  showUserDetails(id: string) {
    this.router.navigateByUrl(`/user/${id}`);
  }

  editUserDetails(id: string) {
    this.router.navigateByUrl(`/user/edit/${id}`);
  }
}
