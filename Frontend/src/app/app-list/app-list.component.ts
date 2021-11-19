import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {
  title = 'Apps list';

  apps: any[] = [];

  constructor(
    public rest: RestService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getApps();
  }

  getApps(): void {
    this.rest.getApps().subscribe((res) => {
      if (res.success) {
        this.apps = res.data;
      }
    });
  }

  add(): void {
    this.router.navigate(['/app-add']);
  }
}
