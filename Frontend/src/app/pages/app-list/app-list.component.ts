import {Component, OnInit} from '@angular/core';
import {AppApiService} from '../../services/app-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {
  title = 'Apps list';

  apps: any[] = [];
  page: number = -1;
  hasMore: Boolean = true;

  constructor(
    public rest: AppApiService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getApps();
  }

  getApps(): void {
    this.page += 1;
    this.rest.getApps(this.page).subscribe((res) => {
      if (res.success) {
        this.apps = this.apps.concat(res.data);
        this.hasMore = res.hasMore
      }
    });
  }

  getAllApps(cb: () => void): void {
    this.page += 1;
    this.rest.getAllApps().subscribe((res) => {
      if (res.success) {
        this.apps = res.data;
        this.hasMore = false
        cb();
      }
    });
  }

  add(): void {
    this.router.navigate(['/app-add']);
  }
}
