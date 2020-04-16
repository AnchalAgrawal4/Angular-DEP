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
  isUserListEmpty: boolean;
  constructor(
    private userService: UserService,
    private userActionService: UserActionService
  ) {}

  ngOnInit(): void {
    this.loadDeletedUsers();
    this.userActionService.userAction$.subscribe(({ value }) =>
      this.activateUser(value)
    );
  }

  loadDeletedUsers(): void {
    this.userService.getDeletedUsers().subscribe((result) => {
      this.userList = result;
      this.isUserListEmpty = this.userList.length === 0;
    });
  }

  activateUser(id: string): void {
    this.userService.activateUser(id).subscribe((_) => this.loadDeletedUsers());
  }
}
