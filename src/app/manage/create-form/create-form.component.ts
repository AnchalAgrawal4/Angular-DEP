import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { User, UserService } from "src/app/user.service";

@Component({
  selector: "app-create-form",
  templateUrl: "./create-form.component.html",
  styleUrls: ["./create-form.component.css"],
})
export class CreateFormComponent implements OnInit {
  createForm: FormGroup = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    login: new FormControl(""),
    password: new FormControl(""),
    age: new FormControl("")
  });

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  createUser() {
    this.userService.createUser(this.createForm.value).subscribe(
      (result) => {
        console.log("Result: Create User API - ", result);
        this.createForm.reset();
      },
      (error) => {
        console.log("Error: Create User API - ", error);
      },
      () => {
        console.log("Complete: Create User API");
      }
    );
  }
}
