import { Component, OnInit } from "@angular/core";
import { User, UserService } from "src/app/user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
  user:any;
  constructor(private route:ActivatedRoute,private userService:UserService) { }
  ngOnInit(){
    this.route.params.subscribe(
      (param) => {
        this.userService.getUserById(param['id']).subscribe(
          (result) => {
            this.user = result;
            console.log('Result: Get User API - ', result);
          },
          (error) => {
            console.log('Error: Get User API - ', error);
          },
          () => {
            console.log('Complete: Get User API');
          }
        );
      }
    );
  }

}
//   userList: User[];
//   constructor(private user: UserService, private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     const idParam = this.route.snapshot.params["id"];
//     console.log(idParam);

//     this.user.getUserById(idParam).subscribe(
//       (result) => {
//         this.userList = result as any;
//         console.log("Fetched User details by ID from API: ", result);
//       },
//       (error) => {
//         console.log("Error while fetching Data from API: ", error);
//       },
//       () => {
//         console.log("Completed fetching data from API");
//       }
//     );
//   }
// }
