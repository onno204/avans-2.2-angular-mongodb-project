import {Component, Input, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {UserApiService} from "../../services/users-api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public users: UserApiService, private route: ActivatedRoute, private router: Router) {
  }

  @Input() data = {
    email: '',
    password: ''
  };

  ngOnInit(): void {
  }

  register(): void {
    this.users.register(this.data.email, this.data.password).subscribe((res) => {
      console.log(res)
      if (res.success) {
        Swal.fire({
          title: 'Successfully registered',
          text: "You have successfully registered",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#5caa19',
          confirmButtonText: 'Ok, take me to the homepage'
        }).then((result) => {
          this.router.navigate(['/']);
        });
      } else {
        Swal.fire({
          title: 'Error!',
          html: res.data,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    });
  }

  login(): void {
    this.users.login(this.data.email, this.data.password).subscribe((res) => {
      if (res.success) {
        Swal.fire({
          title: 'Successfully logged in',
          text: "You have successfully logged in",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#5caa19',
          confirmButtonText: 'Ok, take me to the homepage'
        }).then((result) => {
          this.router.navigate(['/']);
        });
      } else {
        Swal.fire({
          title: 'Error!',
          html: res.data,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    });
  }

}
