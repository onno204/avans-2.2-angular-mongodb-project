import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {DeviceApiService} from "../../services/devices-api.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  constructor(private cookieService: CookieService, public devices: DeviceApiService, private router: Router) { }

  ngOnInit(): void {
    this.getDevices();
  }

  role = "";
  email = "";
  loggedIn = false;
  devicesData: any[] = [];
  roles: string[] = ['admin', 'developer', 'device'];

  getDevices(): void {
    this.devices.getDevices().subscribe(
      (res) => {
        this.devicesData = res.data
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

  addDevice(): void {
    this.router.navigate(['/add-device/']);
  }

  changeRole(id: string): void {
    const doc: any = document.getElementById("role-" + id);
    console.log(doc.value);
    this.devices.updateDevice(id, {role: doc.value}).subscribe((res) => {
      if (res.success) {
        Swal.fire({
          title: 'Device role updated',
          text: "Device role has successfully updated",
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

  deleteDevice(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete device!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.devices.deleteDevice(id).subscribe((res) => {
          if (res.success) {
            Swal.fire({
              title: 'Device removed',
              text: "Device has successfully been deleted",
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then(() => {
              this.getDevices();
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
