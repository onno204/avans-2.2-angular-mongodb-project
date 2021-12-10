import {Component, Input, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {UserApiService} from "../../services/users-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private cookieService: CookieService, public users: UserApiService, private route: ActivatedRoute, private router: Router) {
  }

  @Input() data = {
    email: '',
    password: ''
  };

  ngOnInit(): void {
    try {
      const token = JSON.parse(this.cookieService.get('token') || '[]');
      if (token?.token?.length > 10) {
        this.router.navigate(['/']);
      }
    }catch { }
  }

  register(): void {
    this.users.register(this.data.email, this.data.password).subscribe((res) => {
      if (res.success) {
        this.set_cookie('token', JSON.stringify(res.data), '/')
        Swal.fire({
          title: 'Successfully registered',
          text: "You have successfully registered",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#5caa19',
          confirmButtonText: 'Ok, take me to the homepage'
        }).then((result) => {
          window.location.reload();
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
        this.set_cookie('token', JSON.stringify(res.data), '/')
        Swal.fire({
          title: 'Successfully logged in',
          text: "You have successfully logged in",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#5caa19',
          confirmButtonText: 'Ok, take me to the homepage'
        }).then((result) => {
          window.location.reload();
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

  set_cookie(name: string, value: string, path: string): void {
    document.cookie = name + "=" + value +";path=/" +
      ";expires=Wed, 01 Jan 2070 00:00:01 GMT";
  }

}
