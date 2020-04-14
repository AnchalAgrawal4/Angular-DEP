import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent implements OnInit {
  currentUser;
  userId;
  updateForm: FormGroup = new FormGroup({
    password: new FormControl(''),
    age: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
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

  updateUser() {
    this.userService
      .updateUser({
        id: this.currentUser.id,
        age: this.updateForm.value.age,
        password: this.updateForm.value.password,
      })
      .subscribe((_) => {});
  }
}
