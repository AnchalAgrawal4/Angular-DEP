import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService, User } from 'src/app/user.service';
import { ActivatedRoute } from '@angular/router';
import {
  UserActionService,
  UserActionTypes,
} from 'src/app/shared/user-actions.service';

const passwordPattern = new RegExp('^[a-zA-Z0-9]{8,12}$');
@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent implements OnInit {
  currentUser: User;
  userId: string;
  updateForm: FormGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(passwordPattern),
    ]),
    age: new FormControl('', [Validators.required, Validators.maxLength(2)]),
  });

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private userActionService: UserActionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.userId = param.id;
      this.userService.getUserById(this.userId).subscribe((result) => {
        this.currentUser = result;
        this.updateForm.setValue({
          password: this.currentUser.password,
          age: this.currentUser.age,
        });
      });
    });
  }

  updateUser(): void {
    this.userService
      .updateUser({
        id: this.currentUser.id,
        age: this.updateForm.value.age,
        password: this.updateForm.value.password,
      })
      .subscribe((_) => {
        this.userActionService.onUserAction({
          action: UserActionTypes.EDIT_USER_SUCCESS,
          value: '',
        });
      });
  }
}
