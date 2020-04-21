import { Component, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/user.service';
import { UserActionService } from '../shared/user-actions.service';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css'],
})
export class ActiveComponent implements OnInit {
  userList: User[] = [];
  isUserListEmpty: boolean;

  constructor(
    private userService: UserService,
    private userActionService: UserActionService
  ) {}

  ngOnInit(): void {
    this.loadActiveUsers();
    this.userActionService.userAction$.subscribe(({ value }) =>
      this.deActivateUser(value)
    );
  }

  loadActiveUsers(): void {
    this.userService.getActiveUsers().subscribe((result) => {
      this.userList = result;
      this.isUserListEmpty = this.userList.length === 0;
    });
  }

  deActivateUser(id: string): void {
    this.userService
      .deActivateUser(id)
      .subscribe((_) => this.loadActiveUsers());
  }
}
