import {Component, OnInit} from '@angular/core';
import {AppApiService} from "../../services/app-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-app-update',
  templateUrl: './app-update.component.html',
  styleUrls: ['./app-update.component.scss']
})
export class AppUpdateComponent implements OnInit {
  appData: any;

  constructor(public rest: AppApiService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.rest.getApp(this.route.snapshot.params['id']).subscribe(
      (res) => this.appData = {...res.data}
    );
  }

  handleFileSelect(evt: any) {
    const files = evt.target.files;
    const file = files[0];
    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    const binaryString = readerEvt.target.result;
    this.appData.icon = "data:image/png;base64," + btoa(binaryString);
  }

  updateApp(): void {
    this.rest.updateApp(this.appData._id, this.appData).subscribe((res) => {
      if (res.success) {
        this.router.navigate(['/app-details/' + res.data._id, {updated: true}]);
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
