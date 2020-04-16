import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { UserService } from 'src/app/user.service';
import {
  UserActionService,
  UserActionTypes,
} from 'src/app/shared/user-actions.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
})
export class CreateFormComponent {
  passwordPattern = '^[a-zA-Z0-9]$';
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
        Validators.pattern(this.passwordPattern),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.maxLength(2)]),
    },
    { validators: this.confirmPasswordValidator }
  );

  constructor(
    private userService: UserService,
    private userActionService: UserActionService
  ) {}

  createUser() {
    if (this.createForm.invalid) {
      return;
    } else {
      this.userService.createUser(this.createForm.value).subscribe((_) => {
        this.userActionService.onUserAction({
          action: UserActionTypes.CREATE_USER_SUCCESS,
          value: '',
        });
      });
    }
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      console.log(control);
      return null;
    };
  }
}
