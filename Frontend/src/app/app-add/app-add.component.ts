import {Component, Input, OnInit} from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-app-add',
  templateUrl: './app-add.component.html',
  styleUrls: ['./app-add.component.scss']
})
export class AppAddComponent implements OnInit {
  title = 'App details';

  @Input() appData = { prod_name: '', prod_desc: '', prod_price: 0 };

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  addProduct(): void {
    this.rest.addApp(this.appData).subscribe((res) => {
      if (res.success) {
        this.router.navigate(['/app-details/' + res._id]);
      }else{
        console.log(":(")
      }
    });
  }

}
