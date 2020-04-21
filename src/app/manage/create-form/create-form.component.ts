import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { UserService, User } from 'src/app/user.service';
import {
  UserActionService,
  UserActionTypes,
} from 'src/app/shared/user-actions.service';

const passwordPattern = '^[a-zA-Z0-9]{8,12}$';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
})
export class CreateFormComponent {
  createForm: FormGroup = new FormGroup(
    {
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(passwordPattern),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(passwordPattern),
      ]),
      age: new FormControl('', [Validators.required, Validators.maxLength(2)]),
    },
    { validators: confirmPasswordValidator('password', 'confirmPassword') }
  );

  constructor(
    private userService: UserService,
    private userActionService: UserActionService
  ) {}

  createUser() {
    const { firstName, lastName, login, password, age } = this.createForm.value;
    const payload: User = { firstName, lastName, login, password, age };
    this.userService.createUser(payload).subscribe((_) => {
      this.userActionService.onUserAction({
        action: UserActionTypes.CREATE_USER_SUCCESS,
        value: '',
      });
    });
  }
}

function confirmPasswordValidator(cName1: string, cName2: string): ValidatorFn {
  return (group: FormGroup): ValidationErrors => {
    const password = group.get(cName1).value;
    const confirmPassword = group.get(cName2).value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  };
}
