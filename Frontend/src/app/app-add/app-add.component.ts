import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-app-add',
  templateUrl: './app-add.component.html',
  styleUrls: ['./app-add.component.scss']
})
export class AppAddComponent implements OnInit {
  title = 'App details';

  @Input() appData = {
    name: "",
    description: "",
    category: "",
    public: false,
    icon: ""
  };

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  addProduct(): void {
    console.log("sending:", this.appData)
    this.rest.addApp(this.appData).subscribe((res) => {
      if (res.success) {
        this.router.navigate(['/app-details/' + res._id]);
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

}
