import {Component, Input, OnInit} from '@angular/core';
import {DeviceApiService} from "../../services/devices-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {
  title = 'Device details';

  @Input() deviceData = {
    name: ""
  };

  constructor(public rest: DeviceApiService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  addDevice(): void {
    this.rest.addDevice(this.deviceData).subscribe((res) => {
      if (res.success) {
        this.router.navigate(['/devices/']);
      } else {
        Swal.fire({
          title: 'Error!',
          html: res.message.replaceAll(".,", ".<br>"),
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    });
  }
}
