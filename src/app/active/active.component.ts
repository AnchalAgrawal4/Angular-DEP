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
  constructor(
    private userService: UserService,
    private userActionService: UserActionService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.userActionService.userAction$.subscribe(({
      value
    }) =>
      this.deActivateUser(value)
    );
  }

  loadUsers() {
    this.userService.getActiveUsers().subscribe((result) => {
      this.userList = result;
    });
  }

  deActivateUser(id: string) {
    this.userService.deActivateUser(id).subscribe((_) => this.loadUsers());
  }
}
