import { Component, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/user.service';
import { UserActionService } from '../shared/user-actions.service';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.css'],
})
export class DeletedComponent implements OnInit {
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
      this.activateUser(value)
    );
  }

  loadUsers() {
    this.userService.getDeletedUsers().subscribe((result) => {
      this.userList = result;
    });
  }

  activateUser(id: string) {
    this.userService.activateUser(id).subscribe((_) => this.loadUsers());
  }
}
