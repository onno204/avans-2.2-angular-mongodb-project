import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.scss']
})
export class AppDetailsComponent implements OnInit {
  appData: any;

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.rest.getApp(this.route.snapshot.params['id']).subscribe(
      (res) => {
        this.appData = {...res.data}

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
