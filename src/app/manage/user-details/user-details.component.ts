import { Component, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.userService.getUserById(param['id']).subscribe((result) => {
        this.user = result;
      });
    });
  }
}
