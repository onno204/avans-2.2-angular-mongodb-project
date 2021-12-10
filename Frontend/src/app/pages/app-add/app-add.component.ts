import {Component, Input, OnInit} from '@angular/core';
import {AppApiService} from '../../services/app-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { DeviceApiService } from 'src/app/services/devices-api.service';

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
    icon: "",
    deviceName: ""
  };

  devices: any[] = [];

  constructor(public rest: AppApiService, public devicesApi: DeviceApiService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.devicesApi.getDevices().subscribe((res) => {
      if (res.success) {
        this.devices = res.data.map((data: any) => {
          return data.name
        });
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

  handleFileSelect(evt: any){
    const files = evt.target.files;
    const file = files[0];
    if (files && file) {
      const reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    const binaryString = readerEvt.target.result;
    this.appData.icon = "data:image/png;base64," + btoa(binaryString);
  }

  addApp(): void {
    this.rest.addApp(this.appData).subscribe((res) => {
      if (res.success) {
        this.router.navigate(['/app-details/' + res.data._id]);
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
