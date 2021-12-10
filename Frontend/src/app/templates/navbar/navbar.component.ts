import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private cookieService: CookieService, private router: Router) {
  }

  role = "";
  email = "";
  loggedIn = false;

  ngOnInit(): void {
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

  logout(): void {
    this.delete_cookie('token', '/')
    Swal.fire({
      title: 'Successfully logged out',
      text: "You have successfully logged out",
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#5caa19',
      confirmButtonText: 'Ok'
    }).then((result) => {
      window.location.reload();
    });
  }

  delete_cookie(name: string, path: string): void {
    if (this.get_cookie(name)) {
      document.cookie = name + "=" +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  }

  get_cookie(name: string): boolean {
    return document.cookie.split(';').some(c => {
      return c.trim().startsWith(name + '=');
    });
  }
}
