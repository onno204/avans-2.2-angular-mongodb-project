import {Component, OnInit} from '@angular/core';
import {AppApiService} from '../../services/app-api.service';
import {CommentApiService} from '../../services/comments-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.scss']
})
export class AppDetailsComponent implements OnInit {
  appData: any;
  comment: String = "";
  comments2: any = [];

  loggedIn: boolean = false;
  ownsApp: boolean = false;
  role: string = "";
  email: string = "";
  user_id: string = "";

  constructor(private cookieService: CookieService, public rest: AppApiService, public comments: CommentApiService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.rest.getApp(this.route.snapshot.params['id']).subscribe(
      (res) => {
        this.appData = {...res.data}
        this.getComments();

        try {
          const token = JSON.parse(this.cookieService.get('token') || '[]');
          if (token?.token?.length > 10) {
            this.loggedIn = true;
            this.role = token.role;
            this.email = token.email;
            this.user_id = token.user_id;
            if (this.appData.user_id === this.user_id) {
              this.ownsApp = true;
            }
          }
        } catch {
        }

        if (this.route.snapshot.paramMap.get("updated")) {
          this.router.navigate(['/app-details/' + this.appData._id]);
          Swal.fire({
            title: 'App updated!',
            text: "Your app has been updated!",
            icon: 'info',
            confirmButtonText: 'Ok'
          })
        }
      }
    );

  }

  addComment(): void {
    this.comments.addComment({
      comment: this.comment,
      username: "test username",
      appId: this.appData._id
    }).subscribe((res) => {
      if (res.success) {
        Swal.fire({
          title: 'Added!',
          text: "Your comment has been added",
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.ngOnInit();
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

  getComments(): void {
    this.comments.getComments( this.appData._id).subscribe((res) => {
      if (res.success) {
        res.data.map((data: any) => {
          if (data.user_id === this.user_id) {
            data.ownsComment = true;
          }
          return data;
        })
        this.comments2 = res.data
      }
    });
  }

  deleteComment(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete comment!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.comments.deleteComment(id).subscribe((res) => {
          if (res.success) {
            this.ngOnInit();
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

  deleteApp(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rest.deleteApp(this.appData._id).subscribe((res) => {
          if (res.success) {
            this.router.navigate(['/']);
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
