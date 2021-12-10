import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {UserApiService} from "../../services/users-api.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private cookieService: CookieService, public users: UserApiService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  role = "";
  email = "";
  loggedIn = false;
  usersData: any[] = [];
  roles: string[] = ['admin', 'developer', 'user'];

  getUsers(): void {
    this.users.getUsers().subscribe(
      (res) => {
        this.usersData = res.data
      }
    );

    try {
      const token = JSON.parse(this.cookieService.get('token') || '[]');
      if (token?.token?.length > 10) {
        this.loggedIn = true;
        this.role = token.role;
        this.email = token.email;
      }
    } catch {
    }
  }

  changeRole(id: string): void {
    const doc: any = document.getElementById("role-" + id);
    console.log(doc.value);
    this.users.updateUser(id, {role: doc.value}).subscribe((res) => {
      if (res.success) {
        Swal.fire({
          title: 'User role updated',
          text: "User role has successfully updated",
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      } else {
        Swal.fire({
          title: 'Error!',
          html: res.data.message.replaceAll(".,", ".<br>"),
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    });
  }

  deleteUser(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete user!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.users.deleteUser(id).subscribe((res) => {
          if (res.success) {
            Swal.fire({
              title: 'User removed',
              text: "User has successfully been deleted",
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then(() => {
              this.getUsers();
            })
          } else {
            Swal.fire({
              title: 'Error!',
              html: res.data.message.replaceAll(".,", ".<br>"),
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
        });
      }
    });
  }


}
